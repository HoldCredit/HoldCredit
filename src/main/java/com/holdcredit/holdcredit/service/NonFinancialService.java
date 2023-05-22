package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;

public interface NonFinancialService {
    NonFinancial save(NonFinancialRequestDto nonFinancialRequestDto);

    NonFinancialResponseDto read(Long id);

    void delete(Long id);

    void update(Long id, NonFinancialRequestDto nonFinancialRequestDto);

}
