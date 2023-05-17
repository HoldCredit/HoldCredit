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
    private  Debt debt;
    private Long loanAmount;
    private Long overduePeriod;

    public Redemption toEntity() {
        return Redemption.builder()
                .debt(debt)
                .loanAmount(loanAmount)
                .overduePeriod(overduePeriod)
                .build();
    }
}
