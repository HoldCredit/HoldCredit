package com.holdcredit.holdcredit.service.impl;
import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

 /*   @Override
    public CustomerDto getCustomer(Long userNo) {
        //dataHandler에서 userNo로 찾은 정보의 엔터티를 customer에 담아서
        //그 customer안에 있는 정보를 dto로 만들어준다.

        return null;
    }*/


   /* @Override
    public CustomerDto getCustomer(Long userNo) {
        //dataHandler에서 userNo로 찾은 정보의 엔터티를 customer에 담아서
        //그 customer안에 있는 정보를 dto로 만들어준다.
        CustomerEntity customer = customerDataHandler.getCustomerEntity(userNo);
        CustomerDto customerDto = new CustomerDto(customer.getUserNo(),
                customer.getId(),
                customer.getPwd(),
                customer.getName(),
                customer.getPNum(),
                customer.getRNum(),
                customer.getAdress(),
                customer.getEmail(),
                customer.getJoinDate()
        );
        return customerDto;
    }*/
}
