package com.holdcredit.holdcredit.service.impl;
import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    //  <서비스에서 하는일!>
    //dto에서 회원 정보를 입력하면 그것을 핸들러 한번 거쳐서 엔티티로 바꾼 객체를 customerEntity에 저장한다
    @Override
    public CustomerDto saveCustomer(final CustomerDto customerDto){
        CustomerEntity customerEntity = customerRepository.save(customerDto.toEntity());
        return customerDto;
    }

    @Override
    public CustomerDto getCustomer(CustomerDto customerDto) {
        // 고객 정보 조회 로직 작성
    return null;
    }

}
