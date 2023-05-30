package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerRequestDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerResponseDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.TokenDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.TokenRequestDto;
import com.holdcredit.holdcredit.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<CustomerResponseDto> signup(@RequestBody CustomerRequestDto customerRequestDto) {
        return ResponseEntity.ok(authService.signup(customerRequestDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody CustomerRequestDto customerRequestDto) {
        return ResponseEntity.ok(authService.login(customerRequestDto));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}