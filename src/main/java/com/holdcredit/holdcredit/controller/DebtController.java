package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.service.DebtService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
import static org.springframework.http.HttpStatus.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/debt")
public class DebtController {
    private final DebtService debtService;

    /* 등록*/
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody DebtRequestDto debtRequestDto) { //HTTP 요청 -> 자바 객체 변환
        debtService.save(debtRequestDto);
        return new ResponseEntity<>(CREATED);
    }

    /* 상세보기 */
    @GetMapping("/{id}")
    public ResponseEntity<DebtResponseDto> read(@PathVariable Long id){
        DebtResponseDto debtResponseDto = debtService.read(id);
        if (debtResponseDto != null) {
            return new ResponseEntity<>(debtResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        /*DebtResponseDto debtResponseDto = debtService.read(id);
        return new ResponseEntity<>(debtResponseDto, OK);*/
    }

    /* 삭제 */


    /* 리스트 */








}
