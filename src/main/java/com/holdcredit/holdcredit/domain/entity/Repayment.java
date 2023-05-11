package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@SequenceGenerator(name = "REDEMPTION_SEQ_GENERATOR",sequenceName ="REDEMPTION_SEQ", allocationSize = 1)

public class Repayment {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REDEMPTION_SEQ_GENERATOR")
    private Long redemption_information_no;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "debt_level_no", nullable = false, updatable = false)
    private Debt debtEntity;

    @Column(nullable = false)
    private Long loan_amount;

    @Column(nullable = false)
    private Date overdue_period;

    /*CREATE TABLE "Repayment" (
	"redemption_information_no"	NUMBER		NOT NULL,
	"debt_level_no"	NUMBER		NOT NULL,
	"loan_amount"	NUMBER		NOT NULL,
	"overdue_period"	DATE		NOT NULL
);*/
}
