package com.holdcredit.holdcredit.domain.dto.nonFinancialDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;
import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonFinancialRequestDto {
    private Long customerNo; //먉
    private Classification marital;
    private Long childrenCnt;
    private Classification realestate;
    private Classification vehicle;
    private Classification healthInsurance;
    private Classification phoneBillPayment;
    private Classification proofOfIncomeAmount;
    private Classification nationalPension;

    public NonFinancial toEntity(){
        return NonFinancial.builder()
                .customer(Customer.builder().id(customerNo).build())//먉
                .marital(marital)
                .childrenCnt(childrenCnt)
                .realestate(realestate)
                .vehicle(vehicle)
                .healthInsurance(healthInsurance)
                .phoneBillPayment(phoneBillPayment)
                .proofOfIncomeAmount(proofOfIncomeAmount)
                .nationalPension(nationalPension)
                .build();
    }


}
