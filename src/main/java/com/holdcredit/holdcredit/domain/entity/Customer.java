package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.EducationDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.Gender;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.UserLevel;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static com.holdcredit.holdcredit.domain.entity.enumeration.UserLevel.CUSTOMER;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(sequenceName ="CUSTOMER_SEQ", initialValue = 1, allocationSize = 1, name ="CUSTOMER_SEQ_GENERATOR") //G_generator = S_name
public class Customer {

    @Id //회원번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUSTOMER_NO_SEQ_GENERATOR")
    @Column(name ="customer_no")
    private Long id;

    @Column(nullable = false, length = 20)
    private String customer_id;

    @Column(nullable = false, length = 30)
    private String password;

    @Column(nullable = false, length = 20)
    private String customerName;

    @Column(nullable = false)
    private LocalDate birth; //LocalDateTime 이 아니라 LocalDate만 받아야합니다.

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = false)
    private Long phoneNum;

    @Column(nullable = false, length = 30)
    private String email;

    private LocalDateTime joinDate = LocalDateTime.now(); //현재 시간으로 바로 저장.

    /*
    *  java.util.Date 클래스는 더 이상 권장되지 않는 클래스이며, 대신 java.time.LocalDateTime 클래스를 사용하는 것이 좋습니다.
    *  LocalDateTime 클래스는 java.util.Date 클래스보다 더 간결하고 안정적인 API를 제공합니다.
    *  위와 같이 joinDate 필드를 LocalDateTime 으로 선언하였습니다.
    *  현재 날짜와 시간으로 초기화됩니다.
    * */

    @Enumerated(EnumType.STRING)
    private UserLevel adminLevel = CUSTOMER; // 기본값 : 자동 'CUSTOMER'로 저장

    @Enumerated(EnumType.STRING)
    private JobDomain job = JobDomain.기타; // 기본값 : '기타'로 저장

    @Enumerated(EnumType.STRING)
    private EducationDomain educationLevel = EducationDomain.고등학교졸업; // 기본값 : '고졸'로 저장

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

    /* ================================================================================= */
    /* 연관 관계 설정 */

    // FAQ
    @OneToMany(mappedBy = "customer")
    private List<Faq> faqs = new ArrayList<>();

    // Notice
    @OneToMany(mappedBy = "customer")
    private List<Notice> notices = new ArrayList<>();

    // QNA
    @OneToMany(mappedBy = "customer")
    private List<Qna> qnas = new ArrayList<>();


}





