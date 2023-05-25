package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.DebtRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
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
    private final ScoreRepository scoreRepository;
    private final CustomerRepository customerRepository;

    @Override
    public Debt save(DebtRequestDto debtRequestDto) {
        Customer customer = customerRepository.findById(debtRequestDto.getCustomerNo())
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));
        Debt debt = debtRequestDto.toEntity();
        debt.setCustomer(customer);

        /* 부채점수 */
        // loanAmount, loanPeriod, loanCount를 기반으로 대출 점수 계산
        int loanScore = totalLoanScore(debt.getLoanAmount(), debt.getLoanPeriod(), debt.getLoanCount());

        Score score = new Score();
        score.setLoanScore(loanScore);
        score.setCustomer(debt.getCustomer());
        scoreRepository.save(score);

        return debtRepository.save(debt);
    }

    /* 대출점수 계산 로직 */
    private int totalLoanScore(Long loanAmount, Long loanPeriod, Long loanCount) {
        // 대출금액
        int loanScore = 0;
        if (loanAmount >= 1000) {
            loanScore += 5;
        } else if (loanAmount >= 100) {
            loanScore += 10;
        }
        //남은대출기간
        if (loanPeriod >= 12) {
            loanScore += 5;
        } else if (loanPeriod >= 6) {
            loanScore += 10;
        }
        //대출횟수
        if (loanCount >= 5) {
            loanScore += 5;
        } else if (loanCount >= 2) {
            loanScore += 10;
        }
        return loanScore;
    }




    @Override
    public DebtResponseDto read(Long id){
        Optional<Debt> optionalDebt = debtRepository.findById(id);
        if (optionalDebt.isPresent()) {
            Debt debt = optionalDebt.get();
            DebtResponseDto debtResponseDto = debt.toDto(debt); //먉
            debtResponseDto.setCustomerNo(debt.getCustomer().getId()); //먉
            return debtResponseDto;
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        debtRepository.deleteById(id);
    }

    /*@Override
    public void update(Long id, DebtRequestDto debtRequestDto){
        Debt debt = debtRepository.findById(id);
        debt.updateDebt(debtRequestDto);
        debtRepository.save(debt);
    }*/
    @Override
    public void update(Long id, DebtRequestDto debtRequestDto){
        Optional<Debt> optionalDebt = debtRepository.findById(id);
        if (optionalDebt.isPresent()) {
            Debt debt = optionalDebt.get();
            debt.updateDebt(debtRequestDto);
            debtRepository.save(debt);
        }
    }




}
