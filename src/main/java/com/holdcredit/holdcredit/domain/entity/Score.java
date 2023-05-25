package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.scoreDto.ScoreDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(sequenceName = "SCORE_SEQ", initialValue = 1, allocationSize = 1, name = "SCORE_SEQ_GENERATOR")
public class Score {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SCORE_SEQ_GENERATOR")
    @Column(name = "score_no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no")
    private Customer customer;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "score")
    private ModelingInformation modelingInformation;

    /* 부채 점수*/
    private Integer loanScore;

    /* 상환점수 */
    private Integer paybackScore;

    /* 개인점수 */
    private Integer transactionScore;

    /* 신용형태점수 */
    private Integer creditTypeScore;

    /* 비금융점수 */
    private Integer nonFinancialScore;

    /* 평가일 */
    private LocalDateTime evaluationDate;

    public void setLoanScore(Integer loanScore) {
        this.loanScore = loanScore;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }


    public ScoreDto toDto(Score score) {
        return ScoreDto.builder()
                .id(score.getId())
                .customerNo(score.getCustomer().getId())
                .loanScore(score.getLoanScore())
                .paybackScore(score.getPaybackScore())
                .transactionScore(score.getTransactionScore())
                .creditTypeScore(score.getCreditTypeScore())
                .nonFinancialScore(score.getNonFinancialScore())
                .evaluationDate(score.getEvaluationDate())
                .build();
    }

    public void setPaybackScore(int paybackScore) { this.paybackScore = paybackScore;
    }

    public void setCreditTypeScore(int creditTypeScore) { this.creditTypeScore = creditTypeScore;
    }

    public void setTransactionScore(int transactionScore) { this.transactionScore = transactionScore;
    }

    public void setNonFinancialScore(int nonFinancialScore) { this.nonFinancialScore = nonFinancialScore;
    }
}
