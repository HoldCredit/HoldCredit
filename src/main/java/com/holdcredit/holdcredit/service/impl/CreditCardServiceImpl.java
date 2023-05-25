package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.domain.entity.enumeration.CreditCardCompany;
import com.holdcredit.holdcredit.repository.CreditCardRepository;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
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
    private final CustomerRepository customerRepository;
    private final ScoreRepository scoreRepository;

    @Override
    public CreditCard save(CreditCardRequestDto creditCardRequestDto){
        Customer customer = customerRepository.findById(creditCardRequestDto.getCustomerNo())
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));

        CreditCard creditCard = creditCardRequestDto.toEntity();
        creditCard.setCustomer(customer);

        /* 신용 형태 점수 */
        int creditTypeScore = totalCreditTypeScore(creditCard.getCreditCardCompany(),creditCard.getTransactionPeriod(),creditCard.getLimit(),creditCard.getOverdueCount(),creditCard.getOverduePeriod());

        Score score = scoreRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        score.setCreditTypeScore(creditTypeScore);
        score.setCustomer(creditCard.getCustomer());
        scoreRepository.save(score);

        return creditCardRepository.save(creditCard);
    }

    private int totalCreditTypeScore(CreditCardCompany creditCardCompany, Long transactionPeriod, Long limit, Long overdueCount, Long overduePeriod) {
        int creditTypeScore = 0;
        //신용카드 회사
        if (creditCardCompany == CreditCardCompany.FIRST) {
            creditTypeScore += 15;
        } else if (creditCardCompany == CreditCardCompany.SECOND) {
            creditTypeScore += 10;
        } else creditTypeScore += 5;

        //거래기간
        if (transactionPeriod >= 10) {
            creditTypeScore += 10;
        } else if (transactionPeriod >= 5) {
            creditTypeScore += 5;
        }

        //한도
        if (limit >= 10) {
            creditTypeScore += 10;
        } else if (limit >= 5){
            creditTypeScore += 5;
        }

        //연체횟수
        if(overdueCount >= 10){
            creditTypeScore += 10;
        }  else if (overdueCount >= 5) {
            creditTypeScore += 5;
        }

        //연체기간
        if(overduePeriod >= 10){
            creditTypeScore += 10;
        }  else if (overduePeriod >= 5) {
            creditTypeScore += 5;
        }
        return creditTypeScore;
    }


    @Override
    public CreditCardResponseDto read(Long id){
        Optional<CreditCard> optionalCreditCard = creditCardRepository.findById(id);
        if(optionalCreditCard.isPresent()){
            CreditCard creditCard = optionalCreditCard.get();
            CreditCardResponseDto creditCardResponseDto = creditCard.toDto(creditCard); //먉
            creditCardResponseDto.setCustomerNo(creditCard.getCustomer().getId()); //먉
            return creditCardResponseDto;
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        creditCardRepository.deleteById(id);
    }

    @Override
    public void update(Long id, CreditCardRequestDto creditCardRequestDto){
        CreditCard creditCard = creditCardRepository.findById(id).get();
        creditCard.updateCreditCard(creditCardRequestDto);
        creditCardRepository.save(creditCard);
    }


}
