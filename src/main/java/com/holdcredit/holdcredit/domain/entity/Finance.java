package com.holdcredit.holdcredit.domain.entity;

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
@SequenceGenerator(sequenceName ="FINANCE_SEQ", initialValue = 1, allocationSize = 1, name ="FINANCE_SEQ_GENERATOR")
public class Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "finance_SEQ_GENERATOR")
    @Column(nullable = false)
    private Long personal_financial_no;
    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", nullable = false, updatable = false) //readonly
    private Customer customerEntity; //userNo
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
