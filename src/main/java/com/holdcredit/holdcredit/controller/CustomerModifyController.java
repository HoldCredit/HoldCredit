package com.holdcredit.holdcredit.controller;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerModifyDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.service.CustomerModifyService;
import com.holdcredit.holdcredit.service.impl.CustomerModifyServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customerModify")
public class CustomerModifyController {
    private final CustomerModifyService customerModifyService;
    private final CustomerModifyServiceImpl customerModifyServiceImpl;


    //원하는 회원의 고객 번호를 일단 주소창에 치면 그 회원의 정보를 다 가져올 수 있도록 1차 설계 진행.
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDto> read(@PathVariable Long id){
        CustomerDto customerDto = customerModifyService.read(id);
        if (customerDto != null){
            return new ResponseEntity<>(customerDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //회원 정보 수정
    @PutMapping("/Modify/{id}")
    public ResponseEntity<?> customerModify(@PathVariable Long id, @Validated @RequestBody CustomerModifyDto requestDto) {
        customerModifyService.updateCustomer(id, requestDto);
        Map<String, Object> map = new HashMap<>();
        map.put("message", "JJU 성공");
        System.out.println("requestDto = " + requestDto);
        System.out.println("dddddsfdsfdsfdsfdsfsdfdsfsdfkdfhgkdzhgkdghkd");
        return new ResponseEntity<>(map, HttpStatus.OK);
    }
/*
    @PutMapping("/pwdUpdate/{id}")
    public ResponseEntity<String> pwdUpdate(@PathVariable("id") Long id, @RequestBody String newPassword) {
        System.out.println("ctrl111111");
        try {
            System.out.println("controller222222222");
            customerModifyService.pwdUpdate(id, newPassword);
            System.out.println("newPasswordxxxxxxx" + newPassword);
            return ResponseEntity.ok("비번 변경 성공!");
        } catch (Exception e) {
            System.out.println("e+\"\" = " + e + "에러");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("비번 변경 실패~" + e.getMessage());
        }
    }*/


    //회원 정보 삭제
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id, @RequestParam String password) {
        System.out.println("야ㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑㅑ");
        boolean isPasswordCorrect = customerModifyService.verifyCustomerPassword(id, password);
        if (!isPasswordCorrect) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", "Incorrect password");
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }

        customerModifyService.deleteCustomer(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
