package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.entity.Finance;
import com.holdcredit.holdcredit.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;

@RestController
@RequiredArgsConstructor
@RequestMapping("/finance")
public class FinanceController {
    private final FinanceService financeService;

    /* 등록 */
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody FinanceRequestDto financeRequestDto){
        Long customerNo = financeRequestDto.getCustomerNo();
        System.out.println("전달된 회원 번호: " + customerNo);
        financeService.save(financeRequestDto);
        return new ResponseEntity<>(CREATED);
    }

    /* 읽기 */
    @GetMapping("/{id}")
    public ResponseEntity<FinanceResponseDto> read(@PathVariable Long id){
        FinanceResponseDto financeResponseDto = financeService.read(id);
        if (financeResponseDto != null){
            return new ResponseEntity<>(financeResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /* 삭제 */
    @PutMapping("/delete/{id}")
    public ResponseEntity<Finance> delete(@PathVariable Long id){
        financeService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<FinanceRequestDto> update(@PathVariable Long id, @Validated @RequestBody FinanceRequestDto financeRequestDto){
        financeService.update(id,financeRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
