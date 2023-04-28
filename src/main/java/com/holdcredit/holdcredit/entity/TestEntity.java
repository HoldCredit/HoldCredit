package com.holdcredit.holdcredit.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter @Setter
public class TestEntity {

    @Id @GeneratedValue
    @Column(name="test_id")
    private Long id;

    private String name;

}
