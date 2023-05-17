package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
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
@SequenceGenerator(sequenceName ="REDEMPTION_SEQ", initialValue = 1, allocationSize = 1, name ="REDEMPTION_SEQ_GENERATOR")
public class Redemption {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REDEMPTION_SEQ_GENERATOR")
    @Column(name = "redemption_information_no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "debt_id", referencedColumnName = "debt_id")
    private Debt debt;

    @Column(nullable = false)
    private Long loanAmount;

    @Column(nullable = false)
    private Long overduePeriod;


    public RedemptionResponseDto toDto() {
        return RedemptionResponseDto.builder()
                .id(this.id)
                .debtId(this.debt != null ? this.debt.getId() : null)
                .loanAmount(this.loanAmount)
                .overduePeriod(this.overduePeriod)
                .build();
    }

}
