package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(sequenceName ="REDEMPTION_SEQ", initialValue = 1, allocationSize = 1, name ="REDEMPTION_SEQ_GENERATOR")
public class Redemption {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REDEMPTION_SEQ_GENERATOR")
    @Column(name = "redemption_information_no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "debt_level_no", nullable = false, updatable = false)
    private Debt debt;

    @Column(nullable = false)
    private Long loanAmount;

    @Column(nullable = false)
    private Long overduePeriod;


    /*CREATE TABLE "Repayment" (
	"redemption_information_no"	NUMBER		NOT NULL,
	"debt_level_no"	NUMBER		NOT NULL,
	"loan_amount"	NUMBER		NOT NULL,
	"overdue_period"	DATE		NOT NULL
);*/
}
