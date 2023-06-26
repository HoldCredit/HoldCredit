package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.debtDto.DebtRequestDto;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private Customer customer;

    @Column
    private Long loanAmount;

    @Column
    private Long loanPeriod;

    @Column
    private Long loanCount;

    @OneToOne( mappedBy = "debt", cascade = CascadeType.REMOVE)
    private Redemption redemption;


    public void updateDebt(DebtRequestDto debtRequestDto){
//        this.customer = debtRequestDto.getCustomer();
        this.loanAmount = debtRequestDto.getLoanAmount();
        this.loanPeriod = debtRequestDto.getLoanPeriod();
        this.loanCount = debtRequestDto.getLoanCount();
    }

    /* RedemptionRequestDto에서 Debt 객체를 역직렬화할 때 debt_level_no 값을 받아서 Debt 객체를 생성 */
    public Debt(Long debtId) {
        this.id = debtId;
    }

    public Debt(Customer customer) {
        this.customer = customer;}

    public void setCustomer(Customer customer) {
        this.customer = customer;
    } //먉

    public void setRedemption(Redemption redemption) {
        if (redemption != null) {
            this.redemption = redemption;
            redemption.setDebt(this);
        } else {
            if (this.redemption != null) {
                this.redemption.setDebt(null);
            }
            this.redemption = null;
        }
    } //
    public static DebtResponseDto toDto(Debt debt){
        return DebtResponseDto.builder()
                .id(debt.getId())
                .customerNo(debt.getCustomer().getId()) //먉
                .loanAmount(debt.getLoanAmount())
                .loanPeriod(debt.getLoanPeriod())
                .loanCount(debt.getLoanCount()).build();
    }






}
