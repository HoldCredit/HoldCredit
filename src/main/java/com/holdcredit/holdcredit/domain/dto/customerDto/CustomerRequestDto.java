package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.Authority;
import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.Gender;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerRequestDto {
    private String email;
    private String password;
    private LocalDate birth;
    private String customer_name;
    private Gender gender;
    @JsonProperty(value="phoneNo")
    private Long phone_num;
    private Authority authority;
    @JsonProperty(value = "occupation")
    private JobDomain job;
    @JsonProperty(value="education")
    private EducationLevel education_level;

    public Customer toCustomer (PasswordEncoder passwordEncoder) {
        return Customer.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .birth(birth)
                .authority(Authority.CUSTOMER)
                .customerName(customer_name)
                .gender(gender)
                .phoneNum(phone_num)
                .job(job)
                .educationLevel(education_level)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }

}
