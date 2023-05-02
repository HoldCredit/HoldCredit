package com.holdcredit.holdcredit.data.dto.customerDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class CustomerDto {
    private Long userNo;
    private String Id;
    private String pwd;
    private String name;
    private Long pNum;
    private Long rNum;
    private String adress;
    private String email;
    private String joinDate;

    //dto를 엔터티로 변경하는 작업
    public CustomerEntity toEntity(){
        return CustomerEntity.builder()
                .userNo(userNo)
                .Id(Id)
                .pwd(pwd)
                .name(name)
                .pNum(pNum)
                .rNum(rNum)
                .adress(adress)
                .email(email)
                .joinDate(joinDate)
                .build();
    }
}
