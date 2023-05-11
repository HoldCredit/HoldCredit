package com.holdcredit.holdcredit.data.dto.deptDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.entity.DebtEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeptDto {

    private Long debt_level_no;
    private CustomerEntity customerEntity;  //회원번호
    private Long loan_amount;
    private Date loan_period;
    private Long loan_count;

    /* Dto -> Entity 저장 */
    public DebtEntity toEntity() {
        return DebtEntity.builder()
                .debt_level_no(debt_level_no)
                .customerEntity(customerEntity)
                .loan_amount(loan_amount)
                .loan_period(loan_period)
                .loan_count(loan_count)
                .build();
    }

    /*@Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DEBT_SEQ_GENERATOR")
    private Long debt_level_no;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private CustomerEntity customerEntity;

    @Column(nullable = false)
    private Long loan_amount;

    @Column(nullable = false)
    private Date loan_period;

    @Column(nullable = false)
    private Long loan_count=0L;*/
}
