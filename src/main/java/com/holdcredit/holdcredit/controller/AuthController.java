package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.customerDto.*;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.AuthService;
import com.holdcredit.holdcredit.util.EmailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    private final CustomerRepository customerRepository;

    private final EmailSender emailSender;

    @PostMapping("/signup")
    public ResponseEntity<CustomerResponseDto> signup(@RequestBody CustomerRequestDto customerRequestDto) {
        return ResponseEntity.ok(authService.signup(customerRequestDto));
    }

    @PostMapping("/check-email")
    public ResponseEntity<EmailAvailabilityResponseDto> checkEmailAvailability(@RequestBody CustomerResponseDto customerResponseDto) {
        Optional<Customer> existingCustomer = customerRepository.findByEmail(customerResponseDto.getEmail());
        EmailAvailabilityResponseDto responseDto = new EmailAvailabilityResponseDto();
        responseDto.setEmail(customerResponseDto.getEmail());
        responseDto.setAvailable(!existingCustomer.isPresent());

        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody CustomerRequestDto customerRequestDto) {
        return ResponseEntity.ok(authService.login(customerRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    @PostMapping("/customer")
    public ResponseEntity<LoginResponseDto> getCustomerName(@RequestBody LoginRequestDto loginRequestDto) {
        Customer findCustomer = customerRepository.findById(loginRequestDto.getCustomerNo()).get();
        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setCustomerName(findCustomer.getCustomerName());
        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping("/findId")
    public ResponseEntity<FindIdResponseDto> findId(@RequestBody FindIdRequestDto findIdRequestDto) {
        String customerName = findIdRequestDto.getCustomer_name();
        String phoneNum = findIdRequestDto.getPhone_num();

        String foundEmail = customerRepository.findByCustomerNameAndPhoneNum(
                        customerName, phoneNum
                )
                .map(Customer::getEmail)
                .orElse(null);

        FindIdResponseDto responseDto = new FindIdResponseDto();
        responseDto.setEmail(foundEmail);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/findPwd")
    public ResponseEntity<FindPwdResponseDto> findPwd(@RequestBody FindPwdRequestDto findPwdRequestDto) {
        try {
            authService.findPwd(findPwdRequestDto);
            FindPwdResponseDto responseDto = new FindPwdResponseDto();
            responseDto.setMessage("임시 비밀번호가 이메일로 전송되었습니다.");
            return ResponseEntity.ok(responseDto);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }


}