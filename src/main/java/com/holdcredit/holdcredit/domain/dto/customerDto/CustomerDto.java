package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.Gender;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.Authority;
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
    private String password;
    private String customer_name;
    private LocalDate birth;
    private Gender gender;
    private String phone_num;
    private String email;
    private LocalDateTime join_Date;

    private JobDomain job;
    private Authority authority;

    private EducationLevel education_level;

}
