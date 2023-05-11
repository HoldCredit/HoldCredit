package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="DEBT_SEQ", initialValue = 1, allocationSize = 1, name ="DEBT_SEQ_GENERATOR")
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DEBT_SEQ_GENERATOR")
    @Column(name = "debt_level_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private Customer customer;

    @Column(nullable = false)
    private Long loanAmount;

    @Column(nullable = false)
    private Long loanPeriod;

    @Column(nullable = false)
    private Long loanCount;

    @OneToOne(fetch = FetchType.LAZY)
    private Redemption repayment;


/*
* CREATE TABLE "Debt" (
	"debt_level_no"	NUMBER		NOT NULL,
	"customer_no"	NUMBER		NOT NULL,
	"loan_amount"	NUMBER		NOT NULL,
	"loan_period"	DATE		NOT NULL,
	"loan_count"	NUMBER	DEFAULT 0	NOT NULL
);*/

}
