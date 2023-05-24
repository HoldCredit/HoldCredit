package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.BoardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerModifyDto;
import org.springframework.stereotype.Service;

@Service
public  interface CustomerModifyService {

    //회원 정보 수정시, 수정할 부분만 따로 dto에 담는다.

    //화면에 보여질 고객정보 가져오기
    CustomerDto getCustomer(CustomerDto customerDto);

    CustomerDto read(Long id);


    //회원정보 수정
    void updateCustomer(Long id, CustomerModifyDto requestDto);



}
