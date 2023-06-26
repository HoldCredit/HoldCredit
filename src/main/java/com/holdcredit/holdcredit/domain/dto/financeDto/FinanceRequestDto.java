package com.holdcredit.holdcredit.domain.dto.financeDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Finance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinanceRequestDto {
    private Long customerNo; //먉
    private Long annulIncome;
    private Long continuousService;
    private Long extraMonthlyFund;

    public Finance toEntity(){
        return Finance.builder()
                .annulIncome(annulIncome)
                .continuousService(continuousService)
                .extraMonthlyFund(extraMonthlyFund)
                .build();
    }
}
