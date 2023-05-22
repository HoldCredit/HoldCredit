package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceRequestDto;
import com.holdcredit.holdcredit.domain.dto.financeDto.FinanceResponseDto;
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
@SequenceGenerator(sequenceName ="FINANCE_SEQ", allocationSize = 1, name ="FINANCE_SEQ_GENERATOR")
public class Finance {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "FINANCE_SEQ_GENERATOR")
    @Column(name = "financial_no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", /*nullable = false,*/ updatable = false) //readonly
    private Customer customer; //userNo

    @Column(nullable = false)
    private Long annulIncome;

    @Column(nullable = false)
    private Long continuousService;

    @Column(nullable = false)
    private Long extraMonthlyFund;

    public void updateFinance(FinanceRequestDto financeRequestDto){
        this.annulIncome = financeRequestDto.getAnnulIncome();
        this.continuousService = financeRequestDto.getContinuousService();
        this.extraMonthlyFund = financeRequestDto.getExtraMonthlyFund();
    }

    public FinanceResponseDto toDto(){
        return FinanceResponseDto.builder()
                .id(this.id)
                .customer(this.customer)
                .annulIncome(this.annulIncome)
                .continuousService(this.continuousService)
                .extraMonthlyFund(this.extraMonthlyFund).build();
    }


}
