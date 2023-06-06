package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.entity.Finance;

public interface FinanceService {
    Finance save(Long customerNo, FinanceRequestDto financeRequestDto);

    FinanceResponseDto read(Long id);

    void delete(Long id);

    void update(Long id, FinanceRequestDto financeRequestDto);

}
