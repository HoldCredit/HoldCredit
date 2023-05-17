package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.repository.CreditCardRepository;
import com.holdcredit.holdcredit.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CreditCardServiceImpl implements CreditCardService {
    private final CreditCardRepository creditCardRepository;

    @Override
    public CreditCard save(CreditCardRequestDto creditCardRequestDto){
        CreditCard creditCard = creditCardRequestDto.toEntity();
        return creditCardRepository.save(creditCard);
    }

    @Override
    public CreditCardResponseDto read(Long id){
        Optional<CreditCard> optionalCreditCard = creditCardRepository.findById(id);
        if(optionalCreditCard.isPresent()){
            CreditCard creditCard = optionalCreditCard.get();
            return creditCard.toDto();
        } else {
            return null;
        }
    }


}
