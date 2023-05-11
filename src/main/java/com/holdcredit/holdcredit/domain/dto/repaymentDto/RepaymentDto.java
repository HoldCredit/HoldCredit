package com.holdcredit.holdcredit.domain.dto.repaymentDto;

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
public class RepaymentDto {

    private Long redemption_information_no;
    private Debt debtEntity; //부채 수준 번호
    private Long loan_amount;
    private Date overdue_period;

//    /* Dto -> Entity 저장 */
//    public Redemption toEntity() {
//        return Redemption.builder()
//                .redemption_information_no(redemption_information_no)
//                .debtEntity(debtEntity)
//                .loan_amount(loan_amount)
//                .overdue_period(overdue_period)
//                .build();

    /*CREATE TABLE "Repayment" (
	"redemption_information_no"	NUMBER		NOT NULL,
	"debt_level_no"	NUMBER		NOT NULL,
	"loan_amount"	NUMBER		NOT NULL,
	"overdue_period"	DATE		NOT NULL
);*/
//    }
}
