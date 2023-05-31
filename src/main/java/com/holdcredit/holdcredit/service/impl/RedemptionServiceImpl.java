package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.DebtRepository;
import com.holdcredit.holdcredit.repository.RedemptionRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.RedemptionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class RedemptionServiceImpl implements RedemptionService {
    private final RedemptionRepository redemptionRepository;
    private final ScoreRepository scoreRepository;
    private final DebtRepository debtRepository;

    @Override
    public Redemption save(RedemptionRequestDto redemptionRequestDto) {
        Long debtId = redemptionRequestDto.getDebt().getId();

        Debt debt = debtRepository.findById(debtId)
                .orElseThrow(() -> new IllegalArgumentException("부채번호를 찾을 수 없습니다"));

        Redemption redemption = redemptionRequestDto.toEntity();
        redemption.setDebt(debt);

        /* 상환점수 */
        // loanAmount, loanPeriod, loanCount를 기반으로 대출 점수 계산
        int paybackScore = totalPaybackScore(redemption.getLoanAmount(), redemption.getOverduePeriod());

        Customer customer = debt.getCustomer();
        Score score = scoreRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        score.setPaybackScore(paybackScore);
        scoreRepository.save(score);
        return redemptionRepository.save(redemption);
    }

    private int totalPaybackScore(Long loanAmount, Long OverduePeriod) {
        // 대출금액
        int paybackScore = 0;
        if (loanAmount >= 1000) {
            paybackScore += 5;
        } else if (loanAmount >= 100) {
            paybackScore += 10;
        }

        //연체기간
        if (OverduePeriod >= 10) {
            paybackScore += 5;
        } else if (OverduePeriod >= 5) {
            paybackScore += 10;
        }

        return paybackScore;
    }


    @Override
    public RedemptionResponseDto read(Long id) {
        Optional<Redemption> optionalRedemption = redemptionRepository.findById(id);
        if (optionalRedemption.isPresent()) {
            Redemption redemption = optionalRedemption.get();
            return redemption.toDto();
        } else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        redemptionRepository.deleteById(id);
    }



    @Override
    public void update(Long debtId, RedemptionRequestDto redemptionRequestDto) {
        Optional<Redemption> optionalRedemption = redemptionRepository.findById(debtId);
        //Redemption 엔티티에 업데이트
        if (optionalRedemption.isPresent()) {
            Redemption redemption = optionalRedemption.get();
            redemption.updateRedemption(redemptionRequestDto);
            redemptionRepository.save(redemption);

            //Score 엔티티에 업데이트
            Debt debt = debtRepository.findById(debtId) //debt id를 찾아
                    .orElseThrow(() -> new IllegalArgumentException("해당 부채 정보를 찾을 수 없습니다"));

            Customer customer = debt.getCustomer(); // customer 정보를 불러와

            Score score = scoreRepository.findByCustomer(customer) // 해당 customer id에 score 저장
                    .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

            int paybackScore = totalPaybackScore(redemption.getLoanAmount(), redemption.getOverduePeriod());
            score.setPaybackScore(paybackScore);
            scoreRepository.save(score);
        } else {
            throw new IllegalArgumentException("해당 ID의 상환 정보를 찾을 수 없습니다.");
        }

    }
}
