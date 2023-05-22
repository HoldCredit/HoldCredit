package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import org.springframework.http.ResponseEntity;

public interface DebtService  {
    Debt save(DebtRequestDto debtRequestDto);

    DebtResponseDto read(Long id);
    void delete(Long id);

    void update(Long id, DebtRequestDto debtRequestDto);

}
