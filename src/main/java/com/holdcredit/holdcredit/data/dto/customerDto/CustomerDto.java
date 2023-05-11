package com.holdcredit.holdcredit.data.dto.customerDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.entity.EducationDomain;
import com.holdcredit.holdcredit.data.entity.JobDomain;
import com.holdcredit.holdcredit.data.entity.RoleDomain;
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
    private RoleDomain admin_level;

    private EducationDomain education_level;

    //dto를 엔터티로 변경하는 작업
    public CustomerEntity toEntity(){
        return CustomerEntity.builder()
                .customer_no(customer_no)
                .customer_id(customer_id)
                .password(password)
                .customer_name(customer_name)
                .birth(birth)
                .gender(gender)
                .phone_num(phone_num)
                .email(email)
                .join_Date(join_Date)
                .admin_level(admin_level)
                .education_level(education_level)
                .job(job)
                .build();
    }
}
