package com.holdcredit.holdcredit.domain.entity;

import javax.persistence.*;

@Entity
public class Score {

    @Id
    @GeneratedValue
    @Column(name = "score_no")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Customer customer;
}
