package com.holdcredit.holdcredit.domain.dto.debtDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebtResponseDto {
    private Long id;
    private Customer customer;
    private Long loanAmount;
    private Long loanPeriod;
    private Long loanCount;
}
