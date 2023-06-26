package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.Authority;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

@Data
@ToString
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerModifyDto {
    //회원정보 수정 목록, 아래 그 외는 수정 금지!
    private String password;
    @JsonProperty(value="phoneNo")
    private String phone_num;
    private String email;
    @JsonProperty(value = "occupation")
    private JobDomain job;
    @JsonProperty(value="education")
    private EducationLevel education_level;
    private Authority authority;


    public Customer toEntity(CustomerModifyDto dto, PasswordEncoder passwordEncoder) {

        return Customer.builder()
                .password(passwordEncoder.encode(dto.getPassword()))
                .phoneNum(dto.getPhone_num())
                .email(dto.getEmail())
                .job(dto.getJob())
                .educationLevel(dto.getEducation_level())
                .authority(dto.getAuthority())
                .build();
    }
}
