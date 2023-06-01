package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.enumeration.EducationLevel;
import com.holdcredit.holdcredit.domain.entity.enumeration.JobDomain;
import com.holdcredit.holdcredit.domain.entity.enumeration.UserLevel;
import lombok.*;

@Data
//@NoArgsConstructor
//@AllArgsConstructor
@ToString
@Builder
@Setter
@Getter
public class CustomerModifyDto {
    //회원정보 수정 목록, 아래 그 외는 수정 금지!
    private String password;
    @JsonProperty(value="phoneNo")
    private Long phone_num;
    private String email;
    @JsonProperty(value = "occupation")
    private JobDomain job;

    private UserLevel userLevel;
    @JsonProperty(value="education")
    private EducationLevel education_level;


 public Customer toEntity(CustomerModifyDto dto) {
        return Customer.builder()
                .password(password)
                .phoneNum(phone_num)
                .email(email)
                .job(job)
                .userLevel(userLevel)
                .educationLevel(education_level)
                .build();
    }

    //private Long customer_no;
    //private String customer_id;
    //private String customer_name;
    //private LocalDate birth;
    //private String gender;
    //private LocalDateTime join_Date;


//    //dto를 엔터티로 변경하는 작업을 customer 에서 .dto로 함
//    필요한것만 넣었는데,, 아닐수도 추후 검토 필요!
}
