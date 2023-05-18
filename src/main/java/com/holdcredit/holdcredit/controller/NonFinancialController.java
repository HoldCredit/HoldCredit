package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;
import com.holdcredit.holdcredit.service.NonFinancialService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nonFinancial")
@RequiredArgsConstructor
public class NonFinancialController {
     private final NonFinancialService nonFinancialService;

    @PostMapping("/save")
    public NonFinancial save(@RequestBody NonFinancialRequestDto nonFinancialRequestDto) {
        return nonFinancialService.save(nonFinancialRequestDto);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NonFinancialResponseDto> read(@PathVariable Long id){
        NonFinancialResponseDto nonFinancialResponseDto = nonFinancialService.read(id);
        if (nonFinancialResponseDto != null){
            return new ResponseEntity<>(nonFinancialResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }
}
