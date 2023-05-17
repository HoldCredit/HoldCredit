package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import com.holdcredit.holdcredit.repository.RedemptionRepository;
import com.holdcredit.holdcredit.service.RedemptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RedemptionServiceImpl implements RedemptionService {
    private final RedemptionRepository redemptionRepository;
    @Override
    public Redemption save(RedemptionRequestDto redemptionRequestDto) {
        Redemption redemption = redemptionRequestDto.toEntity();
        return redemptionRepository.save(redemption);
    }

    @Override
    public RedemptionResponseDto read(Long id) {
        Optional<Redemption> optionalRedemption = redemptionRepository.findById(id);
        if (optionalRedemption.isPresent()) {
            Redemption redemption = optionalRedemption.get();
            return redemption.toDto();
        } else {
            return null;
        }
    }
}
