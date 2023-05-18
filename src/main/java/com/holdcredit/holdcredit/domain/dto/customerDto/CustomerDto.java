package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.UserLevel;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Setter
@Getter
public class CustomerDto {
    private Long customer_no;
    private String customer_id;
    private String password;
    private String customer_name;
    private LocalDate birth;
    private String gender;
    private Long phone_num;
    private String email;
    private LocalDateTime join_Date;

    private JobDomain job;
    private UserLevel admin_level;

    private EducationLevel education_level;

//    //dto를 엔터티로 변경하는 작업
//    public Customer toEntity(){
//        return Customer.builder()
//                .id(customer_no)
//                .customerId(customer_id)
//                .password(password)
//                .customerName(customer_name)
//                .birth(birth)
//                .gender(gender)
//                .phone_num(phone_num)
//                .email(email)
//                .join_Date(join_Date)
//                .admin_level(admin_level)
//                .education_level(education_level)
//                .job(job)
//                .build();
//    }
}
