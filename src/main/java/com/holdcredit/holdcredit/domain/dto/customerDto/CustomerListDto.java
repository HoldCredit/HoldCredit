package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.Gender;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CustomerListDto {

    private String name;
    private LocalDate birth;
    private Gender gender;
    private JobDomain job;
    private EducationLevel educationLevel;
    private String phone_num;

}
