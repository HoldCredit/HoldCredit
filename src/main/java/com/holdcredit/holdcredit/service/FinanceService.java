package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.entity.Finance;

public interface FinanceService {
    Finance save(FinanceRequestDto financeRequestDto);

    FinanceResponseDto read(Long id);

}
