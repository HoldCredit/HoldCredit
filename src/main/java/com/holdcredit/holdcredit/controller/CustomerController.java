
package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerListDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerResponseDto;
import com.holdcredit.holdcredit.service.CustomerService;
import com.holdcredit.holdcredit.util.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customer")
public class CustomerController {
    private final CustomerService customerService;

    @PostMapping("/save")
    public CustomerDto save(@RequestBody CustomerDto customerdto) { //HTTP 요청 -> 자바 객체 변환
        return customerService.saveCustomer(customerdto);
    }

    //getMapping 으로 정보 가져와서 뷰에 뿌려줘야함

    @GetMapping("/view")
    public String viewCustomer(Model model) {
        CustomerDto customerDto = new CustomerDto(); // 빈 CustomerDto 객체 생성
        customerDto = customerService.getCustomer(customerDto); // 서비스에서 고객 정보를 가져옴
        model.addAttribute("customerDto", customerDto); // 모델에 고객 정보를 추가
        return "customer"; // Thymeleaf 템플릿 이름을 반환하여 해당 템플릿을 렌더링
    }

    @GetMapping("/me")
    public ResponseEntity<CustomerResponseDto> findCustomerInfoById() {
        return ResponseEntity.ok(customerService.findCustomerInfoById(SecurityUtil.getCurrentCustomerId()));
    }

    @GetMapping("/{email}")
    public ResponseEntity<CustomerResponseDto> findCustomerInfoByEmail(@PathVariable String email) {
        return ResponseEntity.ok(customerService.findCustomerInfoByEmail(email));
    }

    @GetMapping("/list")
    public Page<CustomerListDto> customerList(Pageable pageable) {
        Page<CustomerListDto> customerList = customerService.findCustomerAll(pageable);
        return customerList;
    }
}