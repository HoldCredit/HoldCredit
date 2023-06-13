package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.domain.dto.customerDto.CustomerModifyDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.Gender;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.Authority;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SequenceGenerator(sequenceName ="CUSTOMER_SEQ", initialValue = 1, allocationSize = 1, name ="CUSTOMER_SEQ_GENERATOR") //G_generator = S_name
public class Customer {

    @Id //회원번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "CUSTOMER_SEQ_GENERATOR")
    @Column(name ="customer_no")
    private Long id;

    @Column(nullable = false, length = 500)
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

    @Builder.Default
    private LocalDateTime joinDate = LocalDateTime.now(); //현재 시간으로 바로 저장.

    @Builder.Default
    private LocalDateTime updateDate = LocalDateTime.now();

    /*
     *  java.util.Date 클래스는 더 이상 권장되지 않는 클래스이며, 대신 java.time.LocalDateTime 클래스를 사용하는 것이 좋습니다.
     *  LocalDateTime 클래스는 java.util.Date 클래스보다 더 간결하고 안정적인 API를 제공합니다.
     *  위와 같이 joinDate 필드를 LocalDateTime 으로 선언하였습니다.
     *  현재 날짜와 시간으로 초기화됩니다.
     * */
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private JobDomain job = JobDomain.ETC; // 기본값 : '기타'로 저장

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel = EducationLevel.UNIVERSITY; // 기본값 : '고졸'로 저장

    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Authority authority = Authority.CUSTOMER; // 기본값 : 자동 'CUSTOMER'로 저장
   // private UserLevel userLevel = AUTHORITY; // AUTHORITY ㅁ

    /* ================================================================================= */
    /* 연관 관계 설정 */

    // FAQ
    @Builder.Default
    @OneToMany(mappedBy = "customer")
    private List<Faq> faqs = new ArrayList<>();

    // Notice
    @Builder.Default
    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    private List<Notice> notices = new ArrayList<>();

    // QNA
    @Builder.Default
    @OneToMany(mappedBy = "customer")
    private List<Qna> qnas = new ArrayList<>();

    //부채수준
    @Builder.Default
    @OneToMany(mappedBy = "customer")
    private List<Debt> debts = new ArrayList<>();

    //신용카드 형태
    @Builder.Default
    @OneToMany(mappedBy = "customer")
    private List<CreditCard> creditCards = new ArrayList<>();

    //개인 금융
    @OneToOne(mappedBy = "customer", fetch = FetchType.LAZY)
    private Finance finance;

    //비금융
    @OneToOne(mappedBy = "customer", fetch = FetchType.LAZY)
    private NonFinancial nonFinancial;

    //점수
    @OneToOne(mappedBy = "customer", fetch = FetchType.LAZY)
    private Score scores;


    //근쭈 쓸꺼임>> 회원 수정
    public CustomerDto toDto(){
        return CustomerDto.builder()
                .customer_no(id)
                .password(password)
                .customer_name(customerName)
                .birth(birth)
                .gender(gender)
                .phone_num(phoneNum)
                .email(email)
                .join_Date(joinDate)
                .authority(authority)
                .education_level(educationLevel)
                .job(job)
                .build();
    }

    public void updateCustomer(CustomerModifyDto requestDto, PasswordEncoder passwordEncoder){
        this.password = passwordEncoder.encode(requestDto.getPassword());
        this.phoneNum = requestDto.getPhone_num();
        this.email = requestDto.getEmail();
        this.job = requestDto.getJob();
        this.educationLevel = requestDto.getEducation_level();
    }

    @Builder
    public Customer(String email, String password, Authority authority) {
        this.email = email;
        this.password = password;
        this.authority = authority;
    }

    public void setNotices(Notice notice) {
        this.notices.add(notice);
        notice.setCustomer(this);
    }
    public void setPassword(String password) {
        this.password = password;
    }
}

