package com.holdcredit.holdcredit.data.dto.customerDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
@Setter
public class CustomerDto {
    private Long customer_no;
    private String customer_id;
    private String password;
    private String customer_name;
    private LocalDate birth;
    private String gender;
    private Long phone_num;
    private String email;
    private LocalDateTime joinDate;
    private Long admin_level;

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
                .joinDate(joinDate)
                .admin_level(admin_level)
                .build();
    }
}
