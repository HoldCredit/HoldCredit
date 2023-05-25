package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
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
import org.springframework.http.ResponseEntity;
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
    public Finance save(FinanceRequestDto financeRequestDto) {
        Customer customer = customerRepository.findById(financeRequestDto.getCustomerNo())
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));

        Finance finance = financeRequestDto.toEntity();
        finance.setCustomer(customer);

        /* 개인금융(거래점수) */
        int transactionScore = totalTransactionScore(finance.getAnnulIncome(),finance.getContinuousService(),finance.getExtraMonthlyFund());

        Score score = scoreRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        score.setTransactionScore(transactionScore);
        score.setCustomer(finance.getCustomer());
        scoreRepository.save(score);

        return financeRepository.save(finance);
    }

    private  int totalTransactionScore(Long annulIncome, Long continuousService, Long extraMonthlyFund){
        int transactionScore = 0;
        //연봉
        if (annulIncome >= 10) {
            transactionScore += 10;
        } else if (annulIncome >= 5) {
            transactionScore += 5;
        }

        //근속년수
        if (continuousService >= 10) {
            transactionScore += 10;
        } else if (continuousService >= 5) {
            transactionScore += 5;
        }

        //매달 여유자금
        if (extraMonthlyFund >= 10) {
            transactionScore += 10;
        } else if (extraMonthlyFund >= 5) {
            transactionScore += 5;
        }
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

        financeRepository.deleteById(id);
    }

    @Override
    public void update(Long id, FinanceRequestDto financeRequestDto){
        Finance finance = financeRepository.findById(id).get();
        finance.updateFinance(financeRequestDto);
        financeRepository.save(finance);
    }
}