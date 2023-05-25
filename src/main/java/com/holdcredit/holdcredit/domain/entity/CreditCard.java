package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
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
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CREDITCARD_SEQ_GENERATOR")
    @Column(name = "credit_card_type_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", /*nullable = false,*/ updatable = false) //readonly
    @JsonIgnore
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


    public void updateCreditCard (CreditCardRequestDto creditCardRequestDto){
        this.creditCardCompany = creditCardRequestDto.getCreditCardCompany();
        this.transactionPeriod = creditCardRequestDto.getTransactionPeriod();
        this.limit = creditCardRequestDto.getLimit();
        this.overdueCount = creditCardRequestDto.getOverdueCount();
        this.overduePeriod = creditCardRequestDto.getOverduePeriod();
    }

    public CreditCardResponseDto toDto(CreditCard creditCard){
        return CreditCardResponseDto.builder()
                .id(creditCard.getId())
                .customerNo(creditCard.getCustomer().getId())
                .creditCardCompany(creditCard.getCreditCardCompany())
                .transactionPeriod(creditCard.getTransactionPeriod())
                .limit(creditCard.getLimit())
                .overdueCount(creditCard.getOverdueCount())
                .overduePeriod(creditCard.getOverduePeriod()).build();
    }


    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}
