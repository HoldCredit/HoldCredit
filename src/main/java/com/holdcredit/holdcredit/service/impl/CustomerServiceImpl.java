package com.holdcredit.holdcredit.service.impl;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerListDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerResponseDto;
import com.holdcredit.holdcredit.domain.entity.AnonymousData;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.repository.AnonymousDataRepository;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    //  <서비스에서 하는일!>
    //dto에서 회원 정보를 입력하면 그것을 핸들러 한번 거쳐서 엔티티로 바꾼 객체를 customerEntity에 저장한다
    @Override
    public CustomerDto saveCustomer(final CustomerDto customerDto){
//        Customer customerEntity = customerRepository.save(customerDto.toEntity());
        return customerDto;
    }

    @Override
    public CustomerDto getCustomer(CustomerDto customerDto) {
        // 고객 정보 조회 로직 작성
    return null;
    }

    @Override
    public CustomerResponseDto findCustomerInfoById(String customer_id) {
        return customerRepository.findByEmail(String.valueOf(customer_id))
                .map(CustomerResponseDto::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }

    @Override
    public CustomerResponseDto findCustomerInfoByEmail(String email) {
        return customerRepository.findByEmail(email)
                .map(CustomerResponseDto::of)
                .orElseThrow(() -> new RuntimeException("유저 정보가 없습니다."));
    }

    @Override
    public Page<CustomerListDto> findCustomerAll(Pageable pageable) {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Customer> customerListPage = customerRepository.findAll(paging);
        return customerListPage.map(Customer::customerListDto);
    }
}
