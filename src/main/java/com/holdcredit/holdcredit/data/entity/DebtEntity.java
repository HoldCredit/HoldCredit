package com.holdcredit.holdcredit.data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Debt")
@SequenceGenerator(name = "DEBT_SEQ_GENERATOR", sequenceName = "DEBT_SEQ", allocationSize = 1)
public class DebtEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DEBT_SEQ_GENERATOR")
    private Long debt_level_no;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private CustomerEntity customerEntity;

    @Column(nullable = false)
    private Long loan_amount;

    @Column(nullable = false)
    private Date loan_period;

    @Column(nullable = false)
    private Long loan_count=0L;


/*
* CREATE TABLE "Debt" (
	"debt_level_no"	NUMBER		NOT NULL,
	"customer_no"	NUMBER		NOT NULL,
	"loan_amount"	NUMBER		NOT NULL,
	"loan_period"	DATE		NOT NULL,
	"loan_count"	NUMBER	DEFAULT 0	NOT NULL
);*/

}
