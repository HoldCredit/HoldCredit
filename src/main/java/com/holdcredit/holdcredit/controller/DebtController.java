package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.service.DebtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/debt")
public class DebtController {
    private final DebtService debtService;

    /* 등록*/
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody DebtRequestDto debtRequestDto) { //HTTP 요청 -> 자바 객체 변환
        // 회원 번호 확인
        Long customerNo = debtRequestDto.getCustomerNo();
        System.out.println("전달된 회원 번호: " + customerNo);

        debtService.save(debtRequestDto);
        return new ResponseEntity<>(CREATED);
    }

    /* 상세보기 */
    @GetMapping("/{id}")
    public ResponseEntity<DebtResponseDto> read(@PathVariable Long id){
        DebtResponseDto debtResponseDto = debtService.read(id);
        if (debtResponseDto != null) {
//            return ResponseEntity.ok(debtResponseDto);
            return new ResponseEntity<>(debtResponseDto, HttpStatus.OK);
        } else {
//            return ResponseEntity.notFound().build();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        /*DebtResponseDto debtResponseDto = debtService.read(id);
        return new ResponseEntity<>(debtResponseDto, OK);*/
    }

    /* 삭제 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Debt> delete(@PathVariable Long id){
        debtService.delete(id);
        return new ResponseEntity<>(NOT_FOUND);
    }

    /* 수정 */
    @PutMapping("/{id}")
    public ResponseEntity<DebtRequestDto> update(@PathVariable Long id, @Validated @RequestBody DebtRequestDto debtRequestDto){
        debtService.update(id, debtRequestDto);
        return new ResponseEntity<>(OK);
    }









}
