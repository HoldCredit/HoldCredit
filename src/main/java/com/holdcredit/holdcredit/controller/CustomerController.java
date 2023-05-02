
package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/customer/save")
    public CustomerDto save(@RequestBody CustomerDto customerdto) { //HTTP 요청 -> 자바 객체 변환
        return customerService.saveCustomer(customerdto);
    }
}