package com.holdcredit.holdcredit.domain.dto.redemptionDto;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import com.holdcredit.holdcredit.domain.entity.Debt;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RedemptionResponseDto {
    private Long id;
    private Long debtId;
//    private DebtResponseDto debt;
    private Long loanAmount;
    private Long overduePeriod;
}
