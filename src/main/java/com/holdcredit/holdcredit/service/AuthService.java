package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerRequestDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerResponseDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.TokenDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.TokenRequestDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    CustomerResponseDto signup(CustomerRequestDto customerRequestDto);

    TokenDto login(CustomerRequestDto customerRequestDto);
    TokenDto reissue(TokenRequestDto tokenRequestDto);
}
