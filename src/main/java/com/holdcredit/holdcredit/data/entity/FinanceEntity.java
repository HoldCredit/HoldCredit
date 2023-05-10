package com.holdcredit.holdcredit.data.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Finance")
@SequenceGenerator(sequenceName = "finance_SEQ_GENERATOR", initialValue = 1, allocationSize = 1, name = "finance_SEQ_GENERATOR")

public class FinanceEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finance_SEQ_GENERATOR")
    @Column(nullable = false)
    private Long personal_financial_no;
    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", nullable = false, updatable = false) //readonly
    private CustomerEntity customerEntity; //userNo
//    @JsonIgnore //response에 해당 필드 제외

    @Column(nullable = false)
    private Long annul_Income;
    @Column(nullable = false)
    private Long continuous_service;
    @Column(nullable = false)
    private Long extra_monthly_fund;


    /*CREATE TABLE "Finance" (
	"personal_financial_no"	NUMBER		NOT NULL,
	"customer_no"	NUMBER		NOT NULL,
	"annul_Income"	NUMBER		NOT NULL,
	"continuous_service"	NUMBER		NOT NULL,
	"extra_monthly_fund"	NUMBER		NOT NULL
);*/

}
