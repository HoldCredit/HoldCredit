package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nonFinancial")
@RequiredArgsConstructor
public class NonFinancialController {

    // 비금융 정보 등록
    /*private final NonFinancialService nonFinancialService;

    @PostMapping("/save")
    public NonFinancialDto save(@RequestBody NonFinancialDto nonFinancialDto) { //HTTP 요청 -> 자바 객체 변환
        return nonFinancialService.saveCustomer(nonFinancialDto);
    }*/

    /*public ResponseEntity<BoardInfoDto> postBoard(@RequestBody @Valid postBoardDto dto) {
        BoardInfoDto boardInfoDto = boardService.postBoard(dto);
        return new ResponseEntity<>(boardInfoDto, OK);
    }*/
}
