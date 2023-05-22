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

@RestController
@RequiredArgsConstructor
@RequestMapping("/finance")
public class FinanceController {
    private final FinanceService financeService;

    /* 등록 */
    @PostMapping("/save")
    public Finance save(@RequestBody FinanceRequestDto financeRequestDto){
        return financeService.save(financeRequestDto);
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
    @DeleteMapping("/{id}")
    public ResponseEntity<Finance> delete(@PathVariable Long id){
        financeService.delete(id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FinanceRequestDto> update(@PathVariable Long id, @Validated @RequestBody FinanceRequestDto financeRequestDto){
        financeService.update(id,financeRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
