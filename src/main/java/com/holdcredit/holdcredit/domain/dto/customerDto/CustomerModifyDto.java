package com.holdcredit.holdcredit.domain.dto.customerDto;

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
public class CustomerModifyDto {

    //수정 할 수 있는 부분만 남겨놓기!!! 아닌가,,,? 다 있어야하나...?
    //private Long customer_no;
    //private String customer_id;
    private String password;
    //private String customer_name;
    //private LocalDate birth;
    //private String gender;
    private Long phone_num;
    private String email;
    //private LocalDateTime join_Date;

    private JobDomain job;
    private UserLevel admin_level;

    private EducationLevel education_level;

//    //dto를 엔터티로 변경하는 작업을 customer 에서 .dto로 함
//    필요한것만 넣었는데,, 아닐수도 추후 검토 필요!
}
