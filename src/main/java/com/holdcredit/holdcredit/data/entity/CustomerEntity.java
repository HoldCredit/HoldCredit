package com.holdcredit.holdcredit.data.entity;

import lombok.*;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "customer")
public class CustomerEntity {
    @Id
    Long userNo;

    @Column(columnDefinition = "VARCHAR(30) NOT NULL")
    String Id;

    @Column(columnDefinition = "VARCHAR(30) NOT NULL")
    String pwd;

    @Column(columnDefinition = "VARCHAR(20) NOT NULL")
    String name;

    @Column(columnDefinition = "NUMBER NOT NULL")
    Long pNum;
    @Column(columnDefinition = "NUMBER NOT NULL")
    Long rNum;

    @Column(columnDefinition = "VARCHAR(30) NOT NULL")
    String adress;

    @Column(columnDefinition = "VARCHAR(30) NOT NULL")
    String email;
    @Column(columnDefinition = "DATE NOT NULL")
    String joinDate;

    /*CREATE TABLE "Customer" (
	"userNo"	long		NOT NULL,
	"Id"	VARCHAR(30)		NOT NULL,
	"pwd"	VARCHAR2(30)		NOT NULL,
	"name"	VARCHAR2(20)		NOT NULL,
	"pNum"	NUMBER		NOT NULL,
	"rNum"	NUMBER		NOT NULL,
	"adress"	VARCHAR2(30)		NOT NULL,
	"email"	VARCHAR2(30)		NOT NULL,
	"joinDate"	DATE		NOT NULL,
	"admin"	CHAR(1)	DEFAULT 0	NOT NULL,
	"sessionkey"	VARCHAR2(50)		NOT NULL
);
    }*/
}





