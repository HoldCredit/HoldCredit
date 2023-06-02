package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
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
        Integer creditTypeScore = totalCreditTypeScore(creditCard.getCreditCardCompany(),creditCard.getTransactionPeriod(),creditCard.getLimit(),creditCard.getOverdueCount(),creditCard.getOverduePeriod());

        Score score = scoreRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        score.setCreditTypeScore(creditTypeScore);
        score.setCustomer(creditCard.getCustomer());
        scoreRepository.save(score);

        return creditCardRepository.save(creditCard);
    }

    private Integer totalCreditTypeScore(CreditCardCompany creditCardCompany, Long transactionPeriod, Long limit, Long overdueCount, Long overduePeriod) {
        Integer creditTypeScore = 15;
        if (creditCardCompany == null || transactionPeriod == null ||  limit == null ||  overdueCount == null || overduePeriod == null) {
            return creditTypeScore;
        }

        //신용카드 회사
        if (creditCardCompany == CreditCardCompany.FIRST) {
            creditTypeScore += 3;
        } else if (creditCardCompany == CreditCardCompany.SECOND) {
            creditTypeScore += 2;
        } else creditTypeScore += 1;

        //한도 :**천만원
        if (limit >= 7) {
            creditTypeScore += 3;
        } else if (limit >= 5){
            creditTypeScore += 2;
        } else if (limit >= 3) {
            creditTypeScore += 1;
        }
        //연체횟수
        if(overdueCount == 0){
            creditTypeScore += 5;
        }  else if (overdueCount == 1) {
            creditTypeScore += 4;
        }  else if (overdueCount == 2) {
            creditTypeScore += 3;
        }  else if (overdueCount == 3) {
            creditTypeScore += 2;
        } else if (overdueCount == 4) {
            creditTypeScore += 1;
        }
        //연체기간 **개월
        if(overduePeriod == 0){
            creditTypeScore += 5;
        } else if (overduePeriod <= 3) {
            creditTypeScore += 4;
        } else if (overduePeriod <= 6) {
            creditTypeScore += 3;
        } else if (overduePeriod <= 9) {
            creditTypeScore += 2;
        } else if (overduePeriod <= 12) {
            creditTypeScore += 1;
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
        Optional<CreditCard> optionalCreditCard = creditCardRepository.findById(id);
        if (optionalCreditCard.isPresent()){
            CreditCard creditCard = optionalCreditCard.get();
            Customer customer = creditCard.getCustomer();

            //신용카드 정보 초기화
            CreditCardRequestDto creditCardRequestDto = CreditCardRequestDto.builder().creditCardCompany(null).transactionPeriod(null).limit(null).overdueCount(null).overduePeriod(null).build();
            creditCard.updateCreditCard(creditCardRequestDto);
            creditCardRepository.save(creditCard);

            //Score 엔티티 CreditTypeScore 초기화
            Score score = scoreRepository.findByCustomer(customer)
                    .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));
            Integer creditTypeScore = totalCreditTypeScore(creditCard.getCreditCardCompany(),creditCard.getTransactionPeriod(),creditCard.getLimit(),creditCard.getOverdueCount(),creditCard.getOverduePeriod());
            score.setCreditTypeScore(creditTypeScore);
            scoreRepository.save(score);
        } else {
            throw new IllegalStateException("해당 ID의 신용카드형태 정보를 찾을 수 없습니다.");
        }


    }

    @Override
    public void update(Long id, CreditCardRequestDto creditCardRequestDto){
        CreditCard creditCard = creditCardRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 신용카드형태의 정보를 찾을 수 없습니다"));

        // CreditCard 엔티티에 업데이트
        creditCard.updateCreditCard(creditCardRequestDto);
        creditCardRepository.save(creditCard);

        // Score 엔티티에 업데이트
        Score score = scoreRepository.findByCustomer(creditCard.getCustomer())
                        .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        Integer creditTypeScore = totalCreditTypeScore(creditCard.getCreditCardCompany(),creditCard.getTransactionPeriod(),creditCard.getLimit(),creditCard.getOverdueCount(),creditCard.getOverduePeriod());

        score.setCreditTypeScore(creditTypeScore);
        creditCardRepository.save(creditCard);
    }


}
