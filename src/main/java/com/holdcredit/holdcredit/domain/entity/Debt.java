package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="DEBT_SEQ", allocationSize = 1, name ="DEBT_SEQ_GENERATOR")
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DEBT_SEQ_GENERATOR")
    @Column(name = "debt_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", /*nullable = false,*/ updatable = false)
    private Customer customer;

    @Column(nullable = false)
    private Long loanAmount;

    @Column(nullable = false)
    private Long loanPeriod;

    @Column(nullable = false)
    private Long loanCount;

    @OneToOne(fetch = FetchType.LAZY, mappedBy = "debt")
    private Redemption redemption;


    /* RedemptionRequestDto에서 Debt 객체를 역직렬화할 때 debt_level_no 값을 받아서 Debt 객체를 생성 */
    public Debt(Long debtId) {
        this.id = debtId;
    }


    public DebtResponseDto toDto(Debt debt){
        return DebtResponseDto.builder()
                .id(debt.getId())
                .customer(debt.getCustomer())
                .loanAmount(debt.getLoanAmount())
                .loanPeriod(debt.getLoanPeriod())
                .loanCount(debt.getLoanCount()).build();
    }

}
