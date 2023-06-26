package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionRequestDto;
import com.holdcredit.holdcredit.domain.dto.redemptionDto.RedemptionResponseDto;
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
@SequenceGenerator(sequenceName ="REDEMPTION_SEQ",  allocationSize = 1, name ="REDEMPTION_SEQ_GENERATOR")
public class Redemption {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REDEMPTION_SEQ_GENERATOR")
    @Column(name = "redemption_information_no")
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "debt_id", referencedColumnName = "debt_id",nullable = false, unique = true)
    @JsonIgnore
    private Debt debt;

    @Column
    private Long loanAmount;

    @Column
    private Long debtPeriod;



    public void updateRedemption(RedemptionRequestDto redemptionRequestDto){
        if (this.debt != null) {
            this.loanAmount = this.debt.getLoanAmount();
        }
        this.debtPeriod = redemptionRequestDto.getDebtPeriod();
    }


    public RedemptionResponseDto toDto(Redemption redemption) {
        return RedemptionResponseDto.builder()
                .id(redemption.getId())
                .debtId(redemption.getDebt().getId())
                .loanAmount(redemption.getLoanAmount())
                .debtPeriod(redemption.getDebtPeriod())
                .build();
    }


    public void setDebt(Debt debt) { this.debt = debt;}
    public void setLoanAmount(Long loanAmount) {this.loanAmount = loanAmount;}

    public void resetRedemption() {
        this.loanAmount = null;
        this.debtPeriod = null;
    }
}

