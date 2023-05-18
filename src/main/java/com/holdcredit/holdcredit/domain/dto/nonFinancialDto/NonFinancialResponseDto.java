package com.holdcredit.holdcredit.domain.dto.nonFinancialDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonFinancialResponseDto {
    private Long id;
    private Customer customer;
    private Classification marital;
    private Long childrenCnt;
    private Classification realestate;
    private Classification vehicle;
    private Classification healthInsurance;
    private Classification phoneBillPayment;
    private Classification proofOfIncomeAmount;
    private Classification nationalPension;


}
