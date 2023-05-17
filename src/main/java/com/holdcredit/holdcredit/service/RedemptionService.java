package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Redemption;

public interface RedemptionService {
    Redemption save(RedemptionRequestDto redemptionRequestDto);

    RedemptionResponseDto read(Long id);
}
