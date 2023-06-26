package com.holdcredit.holdcredit.domain.dto.financeDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinanceResponseDto {
    private Long id;
//    private Customer customer;
    private Long customerNo; //먉
    private Long annulIncome;
    private Long continuousService;
    private Long extraMonthlyFund;

}
