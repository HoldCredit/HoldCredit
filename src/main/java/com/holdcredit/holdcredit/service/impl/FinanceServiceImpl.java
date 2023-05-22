package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.entity.Finance;
import com.holdcredit.holdcredit.repository.FinanceRepository;
import com.holdcredit.holdcredit.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FinanceServiceImpl implements FinanceService {
    private final FinanceRepository financeRepository;

    @Override
    public Finance save(FinanceRequestDto financeRequestDto) {
        Finance finance = financeRequestDto.toEntity();
        return financeRepository.save(finance);
    }

    @Override
    public FinanceResponseDto read(Long id) {
        Optional<Finance> optionalFinance = financeRepository.findById(id);
        if (optionalFinance.isPresent()) {
            Finance finance = optionalFinance.get();
            return finance.toDto();
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){

        financeRepository.deleteById(id);
    }

    @Override
    public void update(Long id, FinanceRequestDto financeRequestDto){
        Finance finance = financeRepository.findById(id).get();
        finance.updateFinance(financeRequestDto);
        financeRepository.save(finance);
    }
}