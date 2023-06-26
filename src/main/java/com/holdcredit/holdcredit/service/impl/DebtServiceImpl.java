package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.*;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.DebtRepository;
import com.holdcredit.holdcredit.repository.RedemptionRepository;
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
    private final RedemptionRepository redemptionRepository;
    private final ScoreRepository scoreRepository;
    private final CustomerRepository customerRepository;

    @Override
    public Debt save(DebtRequestDto debtRequestDto) {
        Long customerNo = debtRequestDto.getCustomerNo();
        Customer customer = customerRepository.findById(customerNo)
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));
        Debt debt = debtRequestDto.toEntity();
        debt.setCustomer(customer);

        /* 부채점수 */
        // loanAmount, loanPeriod, loanCount를 기반으로 대출 점수 계산
        Integer loanScore = totalLoanScore(debt.getLoanAmount(), debt.getLoanPeriod(), debt.getLoanCount());

        Score score = scoreRepository.findByCustomer(customer);
        if (score == null) {
            score = new Score();
            score.setCustomer(customer);
            score.setLoanScore(loanScore);
            scoreRepository.save(score);
        } else {
            score.setLoanScore(loanScore);
        }

        return debtRepository.save(debt);
    }

    /* 대출점수 계산 로직 */
    private Integer totalLoanScore(Long loanAmount, Long loanPeriod, Long loanCount) {
        Integer loanScore = 15;
        if (loanAmount == null || loanPeriod == null ||  loanCount == null) {
            return loanScore;
        }

        // 대출금액에 따른 남은 대출기간
        if (loanAmount > 1000) {
            if (loanPeriod <= 18) {
                loanScore += 2;
            } else if (loanPeriod <= 12) {
                loanScore += 3;
            } else if (loanPeriod == 0) {
                loanScore += 5;
            }
        } else if (loanAmount <= 1000) {
            if (loanPeriod <= 12) {
                loanScore += 2;
            } else if (loanPeriod <= 6) {
                loanScore += 3;
            } else if (loanPeriod == 0) {
                loanScore += 5;
            }
        } else if (loanAmount <= 500) {
            if (loanPeriod <= 6) {
                loanScore += 2;
            } else if (loanPeriod <= 3) {
                loanScore += 3;
            } else if (loanPeriod == 0) {
                loanScore += 5;
            }
        }

        //대출횟수
        if (loanCount <= 1) {
            loanScore += 5;
        } else if (loanCount <= 3) {
            loanScore += 3;
        } else if (loanCount <= 5) {
            loanScore += 1;
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
        Optional<Debt> optionalDebt = debtRepository.findById(id);
        if (optionalDebt.isPresent()){
            Debt debt = optionalDebt.get();
            Redemption redemption = debt.getRedemption();
            Customer customer = debt.getCustomer();

            //부채수준 정보 초기화
            DebtRequestDto debtRequestDto = DebtRequestDto.builder().loanAmount(null).loanPeriod(null).loanCount(null).build();
            debt.updateDebt(debtRequestDto);
            debtRepository.save(debt);

            //Redemption 정보 초기화
            redemption.resetRedemption();
            redemptionRepository.save(redemption);

            //Score 엔티티 loanScore 초기화
            Score score = scoreRepository.findByCustomer(customer);
            if (score == null) {
                throw new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다");
            }
            Integer loanScore = totalLoanScore(debt.getLoanAmount(), debt.getLoanPeriod(), debt.getLoanCount());
            score.setLoanScore(loanScore);
            scoreRepository.save(score);
        } else {
            throw new IllegalStateException("해당 ID의 부채수준 정보를 찾을 수 없습니다.");
        }
    }


    @Override
    public void update(Long id, DebtRequestDto debtRequestDto) {
        Optional<Debt> optionalDebt = debtRepository.findById(id);
        //debt 엔티티에 부채수준 업데이트
        if (optionalDebt.isPresent()) {
            Debt debt = optionalDebt.get();
            debt.updateDebt(debtRequestDto);
            debtRepository.save(debt);

            // Score 엔티티에 부채수준 업데이트
            Customer customer = debt.getCustomer();
            Score score = scoreRepository.findByCustomer(customer);
            if (score == null) {
                score = new Score();
                score.setCustomer(debt.getCustomer());
            }
            Integer loanScore = totalLoanScore(debt.getLoanAmount(), debt.getLoanPeriod(), debt.getLoanCount());
            score.setLoanScore(loanScore);
            scoreRepository.save(score);
        } else {
            throw new IllegalArgumentException("해당 ID의 대출 정보를 찾을 수 없습니다.");
        }
    }
}
