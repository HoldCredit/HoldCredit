package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.customerDto.*;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    CustomerResponseDto signup(CustomerRequestDto customerRequestDto);

    TokenDto login(CustomerRequestDto customerRequestDto);
    TokenDto reissue(TokenRequestDto tokenRequestDto);

    FindIdResponseDto findId(FindIdRequestDto findIdRequestDto);

    FindPwdResponseDto findPwd(FindPwdRequestDto findPwdRequestDto);


}
