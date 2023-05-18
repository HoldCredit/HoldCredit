package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtResponseDto;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="DEBT_SEQ", initialValue = 1, allocationSize = 1, name ="DEBT_SEQ_GENERATOR")
public class Debt {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "DEBT_SEQ_GENERATOR")
    @Column(name = "debt_level_no")
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


    public DebtResponseDto toDto(){
        return DebtResponseDto.builder()
                .id(this.getId())
                .customer(this.getCustomer())
                .loanAmount(this.getLoanAmount())
                .loanPeriod(this.getLoanPeriod())
                .loanCount(this.getLoanCount()).build();
    }

}
