package com.holdcredit.holdcredit.domain.dto.redemptionDto;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedemptionRequestDto {
    private Long debtId;
    private Long loanAmount;
    private Long debtPeriod;

    public Redemption toEntity(Debt debt) {
        Long loanAmount = debt != null ? debt.getLoanAmount() : null;
        return  Redemption.builder()
                .debt(Debt.builder().id(debtId).build())
                .loanAmount(loanAmount)
                .debtPeriod(debtPeriod)
                .build();
    }
}
