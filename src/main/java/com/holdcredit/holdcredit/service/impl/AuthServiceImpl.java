package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.customerDto.*;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.RefreshToken;
import com.holdcredit.holdcredit.jwt.TokenProvider;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.RefreshTokenRepository;
import com.holdcredit.holdcredit.service.AuthService;
import com.holdcredit.holdcredit.util.PasswordUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public CustomerResponseDto signup(CustomerRequestDto customerRequestDto) {
        if (customerRepository.existsByEmail(customerRequestDto.getEmail())) {
            throw new RuntimeException("중복된 이메일입니다.");
        }

        Customer customer = customerRequestDto.toCustomer(passwordEncoder);
        return CustomerResponseDto.of(customerRepository.save(customer));
    }

    @Transactional
    public TokenDto login(CustomerRequestDto memberRequestDto) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }

    @Transactional
    public FindIdResponseDto findId(FindIdRequestDto findIdRequestDto) {
        String customerName = findIdRequestDto.getCustomer_name();
        long phoneNum = findIdRequestDto.getPhone_num();

        String foundEmail = customerRepository.findByCustomerNameAndPhoneNum(
                        customerName, phoneNum
                )
                .map(Customer::getEmail)
                .orElse(null);

        FindIdResponseDto responseDto = new FindIdResponseDto();
        responseDto.setEmail(foundEmail);
        return responseDto;
    }

    @Transactional
    public FindPwdResponseDto findPwd(FindPwdRequestDto findPwdRequestDto) {
        String customerName = findPwdRequestDto.getCustomer_name();
        String email = findPwdRequestDto.getEmail();

        Optional<Customer> existingCustomer = customerRepository.findByCustomerNameAndEmail(customerName, email);
        if (existingCustomer.isPresent()) {
            // 임시 비밀번호 생성
            String tempPassword = PasswordUtil.generateTempPassword();

            // 엔티티 업데이트
            Customer customer = existingCustomer.get();
            String encodedPassword = passwordEncoder.encode(tempPassword);
            customer.setPassword(encodedPassword);

            customerRepository.save(customer);

            FindPwdResponseDto responseDto = new FindPwdResponseDto();
            responseDto.setSuccess(true);
            responseDto.setMessage("임시 비밀번호를 발송했습니다.");

            // 임시 비밀번호 반환
            responseDto.setTempPassword(tempPassword);

            return responseDto;
        } else {
            FindPwdResponseDto responseDto = new FindPwdResponseDto();
            responseDto.setSuccess(false);
            responseDto.setMessage("일치하는 계정을 찾을 수 없습니다.");

            return responseDto;
        }
    }
}
