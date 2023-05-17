package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import com.holdcredit.holdcredit.repository.RedemptionRepository;
import com.holdcredit.holdcredit.service.RedemptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public Redemption save(@RequestBody RedemptionRequestDto redemptionRequestDto){
//        Debt debt = redemptionRequestDto.getDebt();
//        if (debt != null) {
//            Long debtId = debt.getId();
//        }
        Long debtId = redemptionRequestDto.getDebt().getId();
        Optional<Redemption> existingRedemption = redemptionRepository.findById(debtId);

        if (existingRedemption.isPresent()) {
            // 이미 해당 debtId를 가진 Redemption이 존재하는 경우 예외 처리
//            throw new Exception("Redemption with debtId " + debtId + " already exists.");
        }

        Redemption redemption = redemptionRequestDto.toEntity();

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




}
