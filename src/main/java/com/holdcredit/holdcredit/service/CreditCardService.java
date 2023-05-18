package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;

public interface CreditCardService {
    CreditCard save(CreditCardRequestDto creditCardRequestDto);

    CreditCardResponseDto read(Long id);
    void delete(Long id);
}
