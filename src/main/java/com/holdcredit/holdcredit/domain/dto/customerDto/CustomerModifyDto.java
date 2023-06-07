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
@Builder
@Setter
@Getter
public class CustomerModifyDto {
    //회원정보 수정 목록, 아래 그 외는 수정 금지!
    private Long customerId;
    private String password;
    @JsonProperty(value="phoneNo")
    private Long phone_num;
    private String email;
    @JsonProperty(value = "occupation")
    private JobDomain job;
    private Authority authority;
    @JsonProperty(value="education")
    private EducationLevel education_level;


 public Customer toEntity(CustomerModifyDto dto, PasswordEncoder passwordEncoder) {
        return Customer.builder()
                .password(passwordEncoder.encode(password))
                .phoneNum(phone_num)
                .email(email)
                .job(job)
                .authority(Authority.CUSTOMER)
                .educationLevel(education_level)
                .build();
    }

    //private Long customer_no;
    //private String customer_id;
    //private String customer_name;ㄴ
    //private LocalDate birth;
    //private String gender;
    //private LocalDateTime join_Date;


//    //dto를 엔터티로 변경하는 작업을 customer 에서 .dto로 함
//    필요한것만 넣었는데,, 아닐수도 추후 검토 필요!
}
