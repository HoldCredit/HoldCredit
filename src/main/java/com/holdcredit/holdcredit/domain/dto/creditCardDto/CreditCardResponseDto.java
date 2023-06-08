package com.holdcredit.holdcredit.domain.dto.creditCardDto;

import com.holdcredit.holdcredit.domain.entity.enumeration.CardCompany;
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
    private CardCompany cardCompany;
    private Long transactionPeriod;
    private Long limit;
    private Long overdueCount;
    private Long overduePeriod;

}
