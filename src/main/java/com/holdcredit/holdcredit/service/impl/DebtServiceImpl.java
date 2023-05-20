package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.repository.DebtRepository;
import com.holdcredit.holdcredit.service.DebtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class DebtServiceImpl implements DebtService{
    private final DebtRepository debtRepository;
    @Override
    public Debt save(DebtRequestDto debtRequestDto) {
        Debt debt = debtRequestDto.toEntity();
        return debtRepository.save(debt);
    }

    @Override
    public DebtResponseDto read(Long id){
        Optional<Debt> optionalDebt = debtRepository.findById(id);
        if (optionalDebt.isPresent()) {
            Debt debt = optionalDebt.get();
            DebtResponseDto debtResponseDto = debt.toDto(debt);
            return debtResponseDto;
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        debtRepository.deleteById(id);
    }




}
