package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
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
@SequenceGenerator(sequenceName = "NON_FINANCIAL_SEQ", initialValue = 1, allocationSize = 1, name = "NON_FINANCIAL_SEQ_GENERATOR")
public class NonFinancial {

    @Id //PK: 비금융 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NON_FINANCIAL_SEQ_GENERATOR")
    @Column(name = "non_financial_no")
    private Long id;

    //FK : userNo
    @OneToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn(name = "customer_no",/* nullable = false,*/ updatable = false) //readonly
//  @JsonIgnore //response에 해당 필드 제외>>>>여기는 확인 해봐야함...ㅋ
    private Customer customer; //userNo

    //결혼여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification marital = Classification.NO;

    //자녀수
    @Column(nullable = false)
    private Long childrenCnt;

    //주택 소유 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification realestate = Classification.NO;

    //자동차 소유 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification vehicle = Classification.NO;

    //건강보험 납부 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification healthInsurance = Classification.NO;

    //통신요금 납부 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)     // Y OR N 둘중 하나만 가능!
    private Classification phoneBillPayment = Classification.NO;

    //소득금액 증명 납부 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification proofOfIncomeAmount = Classification.NO;

    //국민연금 증명 여부
    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 3)    // Y OR N 둘중 하나만 가능!
    private Classification nationalPension = Classification.NO;

    public void updateNonFinancial(NonFinancialRequestDto nonFinancialRequestDto){
        this.marital = nonFinancialRequestDto.getMarital();
        this.childrenCnt = nonFinancialRequestDto.getChildrenCnt();
        this.realestate = nonFinancialRequestDto.getRealestate();
        this.vehicle = nonFinancialRequestDto.getVehicle();
        this.healthInsurance = nonFinancialRequestDto.getHealthInsurance();
        this.phoneBillPayment = nonFinancialRequestDto.getPhoneBillPayment();
        this.proofOfIncomeAmount = nonFinancialRequestDto.getProofOfIncomeAmount();
        this.nationalPension = nonFinancialRequestDto.getNationalPension();
    }

    public NonFinancialResponseDto toDto(){
        return NonFinancialResponseDto.builder()
                .id(this.id)
                .customer(this.customer)
                .marital(this.marital)
                .childrenCnt(this.childrenCnt)
                .realestate(this.realestate)
                .vehicle(this.vehicle)
                .healthInsurance(this.healthInsurance)
                .phoneBillPayment(this.phoneBillPayment)
                .proofOfIncomeAmount(this.proofOfIncomeAmount)
                .nationalPension(this.nationalPension)
                .build();
    }


}
