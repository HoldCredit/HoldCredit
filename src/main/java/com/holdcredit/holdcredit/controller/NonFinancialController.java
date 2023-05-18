package com.holdcredit.holdcredit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nonFinancial")
@RequiredArgsConstructor
public class NonFinancialController {

    // 비금융 정보 등록 알아서 만드셈
/*    private final NonFinancialService nonFinancialService;

    @PostMapping("/save")
    public NonFinancialDto save(@RequestBody NonFinancialDto nonFinancialDto) { //HTTP 요청 -> 자바 객체 변환
        return nonFinancialService.saveNonFinancial(nonFinancialDto);
    }*/
}
