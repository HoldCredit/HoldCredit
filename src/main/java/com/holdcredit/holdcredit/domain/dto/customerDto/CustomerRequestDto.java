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
import java.util.regex.Pattern;

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
    private String phone_num;
    private Authority authority;
    @JsonProperty(value = "occupation")
    private JobDomain job;
    @JsonProperty(value="education")
    private EducationLevel education_level;

    public static boolean isValidEmail(String email) {
        // 이메일 형식이 맞는지 검증하는 로직을 작성합니다.
        return Pattern.matches("^[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,4}$", email);
    }
    public Customer toCustomer (PasswordEncoder passwordEncoder) {
        // 이메일 유효성 검사
        if (!isValidEmail(email)) {
            throw new IllegalArgumentException("유효하지 않은 이메일 형식입니다.");
        }

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
