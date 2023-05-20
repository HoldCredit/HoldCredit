package com.holdcredit.holdcredit.domain.dto.debtDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Redemption;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DebtRequestDto {
//    private Customer customer;  //회원번호
    private Long loanAmount;
    private Long loanPeriod;
    private Long loanCount;

    private Redemption redemption;

    /* Dto -> Entity 저장 */
    public Debt toEntity() {
        return Debt.builder()
               // .customer(customer)
                .loanAmount(loanAmount)
                .loanPeriod(loanPeriod)
                .loanCount(loanCount)
                .redemption(redemption)
                .build();
    }

}
