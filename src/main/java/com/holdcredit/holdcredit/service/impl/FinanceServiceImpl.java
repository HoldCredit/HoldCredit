package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Finance;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.FinanceRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.FinanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class FinanceServiceImpl implements FinanceService {
    private final FinanceRepository financeRepository;
    private final ScoreRepository scoreRepository;
    private final CustomerRepository customerRepository;


    @Override
    public Finance save( FinanceRequestDto financeRequestDto) {
        Long customerNo = financeRequestDto.getCustomerNo();
        Customer customer = customerRepository.findById(customerNo)
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));

        Finance finance = financeRequestDto.toEntity();
        finance.setCustomer(customer);

        /* 개인금융(거래점수) */
        Integer transactionScore = totalTransactionScore(finance.getAnnulIncome(),finance.getContinuousService(),finance.getExtraMonthlyFund());

        Score score = scoreRepository.findByCustomer(customer);
        if (score == null) {
            score = new Score();
            score.setCustomer(customer);
            score.setCreditTypeScore(transactionScore);
            scoreRepository.save(score);
        }else {
            score.setTransactionScore(transactionScore);
        }


        return financeRepository.save(finance);
    }

    private  Integer totalTransactionScore(Long annulIncome, Long continuousService, Long extraMonthlyFund){
        Integer transactionScore = 0;
        //연봉: **천만원
        if (annulIncome >= 5) {
            transactionScore += 2;
        } else if (annulIncome >= 1) {
            transactionScore += 1;
        } else  transactionScore += 0;

        //근속년수
        if (continuousService >= 3) {
            transactionScore += 2;
        } else if (continuousService >= 1) {
            transactionScore += 1;
        } else transactionScore += 0;

        //매달 여유자금: **만원
        if (extraMonthlyFund >= 300) {
            transactionScore += 4;
        } else if (extraMonthlyFund >= 200) {
            transactionScore += 3;
        } else if (extraMonthlyFund >= 100) {
            transactionScore += 2;
        } else if (extraMonthlyFund >= 50) {
            transactionScore += 1;
        } else transactionScore += 0;

        return transactionScore;
    }

    @Override
    public FinanceResponseDto read(Long id) {
        Optional<Finance> optionalFinance = financeRepository.findById(id);
        if (optionalFinance.isPresent()) {
            Finance finance = optionalFinance.get();
            FinanceResponseDto financeResponseDto = finance.toDto(finance); //먉
            financeResponseDto.setCustomerNo(finance.getCustomer().getId()); //먉
            return financeResponseDto;
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        Optional<Finance> optionalFinance = financeRepository.findById(id);
        if (optionalFinance.isPresent()){
            Finance finance = optionalFinance.get();
            Customer customer = finance.getCustomer();

            //개인금융 정보 초기화
            FinanceRequestDto financeRequestDto = FinanceRequestDto.builder().annulIncome(0L).continuousService(0L).extraMonthlyFund(0L).build();
            finance.updateFinance(financeRequestDto);
            financeRepository.save(finance);

            //Score 엔티티 TransactionScore 초기화
            Score score = scoreRepository.findByCustomer(customer);
            if (score == null) {
                throw new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다");
            }
            score.setTransactionScore(null); // nonFinancialScore 초기화
            scoreRepository.save(score);
        } else {
            throw new IllegalStateException("해당 ID의 개인금융 정보를 찾을 수 없습니다.");
        }
    }

    @Override
    public void update(Long id, FinanceRequestDto financeRequestDto){
//        Finance finance = financeRepository.findById(id).get();
        Finance finance = financeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 비금융 정보를 찾을 수 없습니다"));

        //Finance 엔티티에 업데이트
        finance.updateFinance(financeRequestDto);
        financeRepository.save(finance);

        //Score 엔티티에 업데이트
        Score score = scoreRepository.findByCustomer(finance.getCustomer());
        if (score == null) {
            score = new Score();
            score.setCustomer(finance.getCustomer());
        }

        Integer transactionScore = totalTransactionScore(finance.getAnnulIncome(),finance.getContinuousService(),finance.getExtraMonthlyFund());

        score.setTransactionScore(transactionScore);
        financeRepository.save(finance);
    }
}