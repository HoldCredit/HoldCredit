package com.holdcredit.holdcredit.domain.dto.creditCardDto;

import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.CreditCardCompany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import static org.hibernate.boot.model.process.spi.MetadataBuildingProcess.build;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreditCardRequestDto {
    private Long customerNo; //먉
    private CreditCardCompany creditCardCompany;
    private Long transactionPeriod;
    private Long limit;
    private Long overdueCount;
    private Long overduePeriod;

    public CreditCard toEntity(){
        return CreditCard.builder()
                .customer(Customer.builder().id(customerNo).build()) //먉
                .creditCardCompany(creditCardCompany)
                .transactionPeriod(transactionPeriod)
                .limit(limit)
                .overdueCount(overdueCount)
                .overduePeriod(overduePeriod)
                .build();
    }


}
