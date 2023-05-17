package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.CreditCardCompany;
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
@SequenceGenerator(sequenceName = "CREDITCARD_SEQ", initialValue = 1, allocationSize = 1, name = "CREDITCARD_SEQ_GENERATOR")
//@Table(name = "CreditCard")
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CREDITCARD_SEQ_GENERATOR")
    @Column(name = "credit_card_type_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", /*nullable = false,*/ updatable = false) //readonly
    private Customer customer; //userNo
//    @JsonIgnore //response에 해당 필드 제외

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,length = 30)
    private CreditCardCompany creditCardCompany;

    @Column(nullable = false)
    private Long transactionPeriod;

    @Column(nullable = false)
    private Long limit;

    @Builder.Default
    @Column(nullable = false)
    private Long overdueCount = 0L;//0으로 디폴트값 줌

    @Column(nullable = false)
    /*columnDefinition = "DATE DEFAULT NULL"을 사용하여
    overdue_period 필드의 기본값을 null로 설정합니다.
    CreditCardEntity 클래스는 오라클 데이터베이스에서
    overdue_period 필드에 기본값으로 null을 저장할 수 있게 됩니다.*/
    private Long overduePeriod= 0L;    /* 1주일 -> 7 */

    public CreditCardResponseDto toDto(){
        return CreditCardResponseDto.builder()
                .id(this.id)
                .customer(this.customer)
                .creditCardCompany(this.creditCardCompany)
                .transactionPeriod(this.transactionPeriod)
                .limit(this.limit)
                .overdueCount(this.overdueCount)
                .overduePeriod(this.overduePeriod).build();
    }


}
