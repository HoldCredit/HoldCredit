package com.holdcredit.holdcredit.data.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Customer")
@SequenceGenerator(sequenceName ="customer_no_SEQ_GENERATOR", initialValue = 1, allocationSize = 1, name ="customer_no_SEQ_GENERATOR")    //G_generator = S_name
public class CustomerEntity{
    @Id //회원번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "customer_no_SEQ_GENERATOR")
    @Column(nullable = false)
    private Long customer_no;

    @Column(nullable = false, length = 20)
    private String customer_id;

    @Column(nullable = false, length = 30)
    private String password;

    @Column(nullable = false, length = 20)
    private String customer_name;

    @Column(nullable = false)
    private LocalDate birth; //LocalDateTime 이 아니라 LocalDate만 받아야합니다.

    @Column(nullable = false, length = 1)
    private String gender;

    @Column(nullable = false)
    private Long phone_num;

    @Column(nullable = false, length = 30)
    private String email;

    @Column(nullable = false)
    private LocalDateTime join_Date = LocalDateTime.now(); //현재 시간으로 바로 저장.

    /*
    *  java.util.Date 클래스는 더 이상 권장되지 않는 클래스이며, 대신 java.time.LocalDateTime 클래스를 사용하는 것이 좋습니다.
    *  LocalDateTime 클래스는 java.util.Date 클래스보다 더 간결하고 안정적인 API를 제공합니다.
    *  위와 같이 joinDate 필드를 LocalDateTime 으로 선언하였습니다.
    *  현재 날짜와 시간으로 초기화됩니다.
    * */

    @Column(nullable = false)
    private Long admin_level = 0L; // 0 이 커스토머 1이 관리자 // 기본값은 0으로 지정했습니다.

    @Column(nullable = false)
    private Long job = 0L; // 0 이 무직 // 기본값은 0으로 지정했습니다.
    //1,2,3,4 번은 직업을 뭘로할지 생각해봐야합니다. >>  도매인으로 생성할 예정

    @Column(nullable = false)
    private Long education_level = 0L; // 0 이 고졸 // 기본값은 0으로 지정했습니다.
    //1,2,3,4 번은 고졸, 중졸, 대졸, 석사, 박사 뭘로할지 생각해봐야합니다. >>  도매인으로 생성할 예정

    /*CREATE TABLE "Customer" (
	"customer_no"	NUMBER		NOT NULL,
	"customer_id"	VARCHAR2(20)		NOT NULL,
	"password"	VARCHAR2(30)		NOT NULL,
	"customer_name"	VARCHAR2(20)		NOT NULL,
	"birth" DATE		NOT NULL,
	"sex"	CHAR(1)		NOT NULL,
	"phone_num"	NUMBER		NOT NULL,
	"email"	VARCHAR2(30)		NOT NULL,
	"join_date"	DATE		NOT NULL,
	"admin_level"	NUMBER	DEFAULT customer	NOT NULL,
	"job"	NUMBER	DEFAULT 기타	NOT NULL,
	"education_level"	NUMBER	DEFAULT 고등졸	NOT NULL
);
    }*/
}





