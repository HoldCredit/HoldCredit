package com.holdcredit.holdcredit.controller;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.service.CustomerModifyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customerModify")
public class CustomerModifyController {
    private CustomerModifyService customerModifyService;

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






}
