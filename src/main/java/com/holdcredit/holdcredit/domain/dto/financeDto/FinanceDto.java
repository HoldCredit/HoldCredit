package com.holdcredit.holdcredit.domain.dto.financeDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Finance;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Setter
public class FinanceDto {
    private Long personal_financial_no;
    private Long customer_no;
    private Long annul_Income;
    private Long continuous_service;
    private Long extra_monthly_fund;
    private Customer customerEntity;

//    public Finance toEntity() {
//        return Finance.builder()
//                .personal_financial_no(personal_financial_no)
//                .customerEntity(customerEntity)
//                .annul_Income(annul_Income)
//                .continuous_service(continuous_service)
//                .extra_monthly_fund(extra_monthly_fund)
//                .build();
//    }
    /*CREATE TABLE "Finance" (
	"personal_financial_no"	NUMBER		NOT NULL,
	"customer_no"	NUMBER		NOT NULL,
	"annul_Income"	NUMBER		NOT NULL,
	"continuous_service"	NUMBER		NOT NULL,
	"extra_monthly_fund"	NUMBER		NOT NULL
);*/
}
