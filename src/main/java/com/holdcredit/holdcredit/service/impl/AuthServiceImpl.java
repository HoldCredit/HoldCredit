package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.customerDto.*;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.RefreshToken;
import com.holdcredit.holdcredit.jwt.TokenProvider;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.RefreshTokenRepository;
import com.holdcredit.holdcredit.service.AuthService;
import com.holdcredit.holdcredit.util.EmailSender;
import com.holdcredit.holdcredit.util.PasswordUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    private final EmailSender emailSender;

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
        UsernamePasswordAuthenticationToken authenticationToken = memberRequestDto.toAuthentication();

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

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
        String phoneNum = findIdRequestDto.getPhone_num();

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

        // 임시 비밀번호 생성 로직
        String temporaryPassword = generateTemporaryPassword();

        // 비밀번호 변경
        Optional<Customer> optionalCustomer = customerRepository.findByCustomerNameAndEmail(customerName, email);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            String encryptedPassword = passwordEncoder.encode(temporaryPassword);
            customer.setPassword(encryptedPassword);
            customerRepository.save(customer);
        } else {
            throw new RuntimeException("일치하는 사용자가 없습니다.");
        }

        // 임시 비밀번호 이메일 전송
        emailSender.sendTemporaryPassword(email, temporaryPassword);

        FindPwdResponseDto responseDto = new FindPwdResponseDto();
        responseDto.setMessage("임시 비밀번호가 이메일로 전송되었습니다.");
        return responseDto;
    }

    private String generateTemporaryPassword() {
        int length = 10; // 임시 비밀번호 길이
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"; // 사용할 문자 조합
        StringBuilder password = new StringBuilder();

        Random random = new SecureRandom();
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }
}
