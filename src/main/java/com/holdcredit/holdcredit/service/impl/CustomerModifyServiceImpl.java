package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerModifyDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.repository.CustomerModifyRepository;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.CustomerModifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerModifyServiceImpl implements CustomerModifyService {
    private final CustomerRepository customerRepository;
    private final CustomerModifyRepository customerModifyRepository;

    private final PasswordEncoder passwordEncoder;

    /*      <서비스에서 하는일!>
    dto에서 수정 할 회원 정보를 입력하면 그것을 핸들러 한번 거쳐서 엔티티로 바꾼 객체를 customerEntity에 저장한다*/
    @Override
    public CustomerDto getCustomer(CustomerDto customerDto) {
        // 고객 정보 조회 로직 작성 할 예정ㅋ
        return null;
    }

    @Override
    public CustomerDto read(Long id) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = optionalCustomer.get();
            return customer.toDto();
        } else {
            return null;
        }
    }

    // 회원 정보 수정
    @Override
    public void updateCustomer(Long id, CustomerModifyDto requestDto) {
        Customer customer = customerRepository.findById(id).get();
        customer.updateCustomer(requestDto);
        customerModifyRepository.save(customer);
    }

    @Transactional
    @Override
    public void pwdUpdate(Long id, String newPassword){
        System.out.println("ddddddservice");
        String encodePwd = passwordEncoder.encode(newPassword);
        System.out.println("id = " + id+ "newPAsww"+encodePwd);
        customerModifyRepository.pwdUpdate(id,encodePwd);
    }


    //회원 정보 삭제
    @Override
    public void deleteCustomer(Long id){
            customerModifyRepository.deleteById(id);
        //    customerModifyRepository.deleteByIdAndPassword(id, modifyDto.getPassword());
    }


}
