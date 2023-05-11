package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Id;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "NonFinalcial")
public class NonFinancial {

    @Id //PK: 비금융 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "non_financial_SEQ_GENERATOR")
    @Column(nullable = false)
    private Long non_financial_no;

    //FK : userNo
    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn(name = "customer_no", nullable = false, updatable = false) //readonly
//  @JsonIgnore //response에 해당 필드 제외>>>>여기는 확인 해봐야함...ㅋ
    private Customer customerEntity; //userNo

    //결혼여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String marital;

    //자녀수
    @Column(nullable = false)
    private Long children_cnt;

    //주택 소유 여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String realestate;

    //자동차 소유 여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String vehicle;

    //건강보험 납부 여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String health_insurance;

    //통신요금 납부 여부
    @Column(nullable = false, length = 1)     // Y OR N 둘중 하나만 가능!
    private String phone_bill_payment;

    //소득금액 증명 납부 여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String proof_of_income_amount;

    //국민연금 증명 여부
    @Column(nullable = false, length = 1)    // Y OR N 둘중 하나만 가능!
    private String national_pension;



    /*CREATE TABLE "NonFinancial" (
	피케이 "non_financial_no"	NUMBER		NOT NULL,
	에프케이 "customer_no"	NUMBER		NOT NULL,
	"marital"	CHAR(1)		NOT NULL,
	"children_cnt"	NUMBER		NOT NULL,
	"realestate"	CHAR(1)		NOT NULL,
	"vehicle"	CHAR(1)		NOT NULL,
	"health_insurance"	CHAR(1)		NOT NULL,
	"phone_bill_payment"	CHAR(1)		NOT NULL,
	"proof_of_income_amount"	CHAR(1)		NOT NULL,
	"national_pension"	CHAR(1)		NOT NULL
);*/
}
