package com.holdcredit.holdcredit.domain.entity;

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
    private Customer customer;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "score")
    private ModelingInformation modelingInformation;

    private Integer loanScore;

    private Integer paybackScore;

    private Integer transactionScore;

    private Integer creditTypeScore;

    private Integer nonFinancialScore;

    private LocalDateTime evaluationDate;


}
