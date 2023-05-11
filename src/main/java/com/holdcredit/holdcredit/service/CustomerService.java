package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.repository.CustomerRepository;
import org.springframework.stereotype.Service;

@Service
public  interface CustomerService {

    //핸들러 메서드는 dto// service에 똑같이 있는 메서드는 dao에 활용!!!
    CustomerDto saveCustomer(final CustomerDto customerDto);

    //회원을 가져올때 pk로 가져오기
    //근데 가져올때 유저 넘버로 가져올지 유저 아이디로 가져올지 생각해야함…뀨
/*    CustomerDto getCustomer(Long userNo);*/

    //고객정보 가져오기
    CustomerDto getCustomer(CustomerDto customerDto);
}
