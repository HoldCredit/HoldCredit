package com.holdcredit.holdcredit.service.impl;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerModifyDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.CustomerModifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerModifyServiceImpl implements CustomerModifyService {
    private final CustomerRepository customerRepository;

    /*      <서비스에서 하는일!>
    dto에서 수정 할 회원 정보를 입력하면 그것을 핸들러 한번 거쳐서 엔티티로 바꾼 객체를 customerEntity에 저장한다*/
    @Override
    public CustomerDto getCustomer(CustomerDto customerDto) {
        // 고객 정보 조회 로직 작성
    return null;
    }

    @Override
    public CustomerDto read(Long id){
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if(optionalCustomer.isPresent()){
            Customer customer = optionalCustomer.get();
            return customer.toDto();
        } else {
            return null;
        }


    //@Override
    //public CustomerDto updateCustomer(final CustomerDto customerDto){
//        Customer customerEntity = customerRepository.save(customerDto.toEntity());
      //  return customerDto;
    }

    @Override
    public CustomerDto updateCustomer(CustomerDto customerDto) {
        return null;
    }
}
