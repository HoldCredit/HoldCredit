package com.holdcredit.holdcredit.data.dto.nonFinancialDto;

import com.holdcredit.holdcredit.data.entity.NonFinancialEntity;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Setter
public class NonFinancialDto {

    private Long non_financial_no;
    private String marital_status;
    private Long children_cnt;
    private String realestate;
    private String vehicle;
    private String health_insurance;
    private String phone_bill_payment;
    private String proof_of_income_amount;
    private String national_pension;

    public NonFinancialEntity toEntity() {
        return NonFinancialEntity.builder()
                .non_financial_no(non_financial_no)
                .marital_status(marital_status)
                .children_cnt(children_cnt)
                .realestate(realestate)
                .vehicle(vehicle)
                .health_insurance(health_insurance)
                .phone_bill_payment(phone_bill_payment)
                .proof_of_income_amount(proof_of_income_amount)
                .national_pension(national_pension)
                .build();
    }
}
