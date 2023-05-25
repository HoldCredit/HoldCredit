package com.holdcredit.holdcredit.domain.dto.creditCardDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.CreditCardCompany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditCardResponseDto {
    private Long id;
//    private Customer customer;
    private Long customerNo; //먉
    private CreditCardCompany creditCardCompany;
    private Long transactionPeriod;
    private Long limit;
    private Long overdueCount;
    private Long overduePeriod;

}
