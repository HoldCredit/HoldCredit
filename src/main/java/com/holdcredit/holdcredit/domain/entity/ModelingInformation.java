package com.holdcredit.holdcredit.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(sequenceName = "MODELING_INFO_SEQ", initialValue = 1, allocationSize = 1, name = "MODELING_INFO_SEQ_GENERATOR")
public class ModelingInformation {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "MODELING_INFO_SEQ_GENERATOR")
    @Column(name = "modeling_information_no")
    Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Score score;

    private Integer creditScore;

    private Integer overdueProbability;

    private Integer aveTradePeriod;

    private Integer aveIncomeByAge;





}
