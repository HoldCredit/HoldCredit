package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import com.holdcredit.holdcredit.repository.RedemptionRepository;
import com.holdcredit.holdcredit.service.RedemptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@RequiredArgsConstructor
@RequestMapping("/redemption")
public class RedemptionController {
    private final RedemptionService redemptionService;
    private final RedemptionRepository redemptionRepository;

    /* 등록*/
    @PostMapping("/save")
    public Redemption save(@RequestBody RedemptionRequestDto redemptionRequestDto) throws Exception{
        return  redemptionService.save(redemptionRequestDto);
    }

    /* 상세보기 */
    @GetMapping("/{id}")
    public ResponseEntity<RedemptionResponseDto> read(@PathVariable Long id){
        RedemptionResponseDto redemptionResponseDto = redemptionService.read(id);
        if (redemptionResponseDto != null) {
            return new ResponseEntity<>(redemptionResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    /* 삭제 */
    @DeleteMapping("/{id}")
    public ResponseEntity<Redemption> delete(@PathVariable Long id){
        redemptionService.delete(id);
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    /* 수정 */
    @PutMapping("/{id}")
    public ResponseEntity<RedemptionRequestDto> update(@PathVariable Long id, @RequestBody @Validated RedemptionRequestDto redemptionRequestDto){
        redemptionService.update(id, redemptionRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }



}
