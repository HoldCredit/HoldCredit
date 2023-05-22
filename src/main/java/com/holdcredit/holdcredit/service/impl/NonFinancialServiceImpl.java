package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;
import com.holdcredit.holdcredit.repository.CreditCardRepository;
import com.holdcredit.holdcredit.repository.NonFinancialRepository;
import com.holdcredit.holdcredit.service.NonFinancialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NonFinancialServiceImpl implements NonFinancialService {
    private final NonFinancialRepository nonFinancialRepository;

    @Override
    public NonFinancial save(NonFinancialRequestDto nonFinancialRequestDto){
        NonFinancial nonFinancial = nonFinancialRequestDto.toEntity();
        return nonFinancialRepository.save(nonFinancial);
    }

    @Override
    public NonFinancialResponseDto read(Long id){
        Optional<NonFinancial> optionalNonFinancial = nonFinancialRepository.findById(id);
        if (optionalNonFinancial.isPresent()){
            NonFinancial nonFinancial = optionalNonFinancial.get();
            return  nonFinancial.toDto();
        }else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        nonFinancialRepository.deleteById(id);
    }

    @Override
    public void update(Long id, NonFinancialRequestDto nonFinancialRequestDto){
        NonFinancial nonFinancial = nonFinancialRepository.findById(id).get();
        nonFinancial.updateNonFinancial(nonFinancialRequestDto);
        nonFinancialRepository.save(nonFinancial);
    }




}
