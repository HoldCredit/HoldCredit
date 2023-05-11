package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "CreditCard")
@SequenceGenerator(sequenceName = "CreditCard_SEQ_GENERATOR", initialValue = 1, allocationSize = 1, name = "CreditCard_SEQ_GENERATOR")

public class CreditCard {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CreditCard_SEQ_GENERATOR")
    @Column(nullable = false)
    private Long credit_card_type_no;
    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", nullable = false, updatable = false) //readonly
    private Customer customerEntity; //userNo
//    @JsonIgnore //response에 해당 필드 제외

    @Column(nullable = false,length = 30)
    private String credit_card_company;
    @Column(nullable = false)
    private LocalDate transaction_period;

    @Column(nullable = false)
    private Long limit;
    @Column(nullable = false)
    private Long overdue_count =0L;//0으로 디폴트값 줌

    @Column(nullable = true, columnDefinition = "DATE DEFAULT NULL")
    /*columnDefinition = "DATE DEFAULT NULL"을 사용하여
    overdue_period 필드의 기본값을 null로 설정합니다.
    CreditCardEntity 클래스는 오라클 데이터베이스에서
    overdue_period 필드에 기본값으로 null을 저장할 수 있게 됩니다.*/
    private Date overdue_period;    //연체된 날이 없을 수 도 있기 때문에 널값 허용함.

    /*
CREATE TABLE "CreditCard" (
	"credit_card_type_no"	NUMBER		NOT NULL,
	"customer_no"	NUMBER		NOT NULL,
	"credit_card_company"	VARCHAR2(30)		NOT NULL,
	"transaction_period"	DATE		NOT NULL,
	"limit"	NUMBER		NOT NULL,
	"overdue_count"	NUMBER	DEFAULT 0	NOT NULL,
	"overdue_period"	DATE	DEFAULT 0	NOT NULL
);*/
}
