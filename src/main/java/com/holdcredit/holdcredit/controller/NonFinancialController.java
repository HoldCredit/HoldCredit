package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;
import com.holdcredit.holdcredit.service.NonFinancialService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/nonFinancial")
@RequiredArgsConstructor
public class NonFinancialController {
     private final NonFinancialService nonFinancialService;

    @PostMapping("/save")
    public ResponseEntity<NonFinancial> save(@RequestBody NonFinancialRequestDto nonFinancialRequestDto) {
        NonFinancial save = nonFinancialService.save(nonFinancialRequestDto);
        return new ResponseEntity<>(save ,HttpStatus.CREATED);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<NonFinancial> delete(@PathVariable Long id){
        nonFinancialService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NonFinancialRequestDto> update(@PathVariable Long id, @Validated @RequestBody NonFinancialRequestDto nonFinancialRequestDto){
        nonFinancialService.update(id, nonFinancialRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
