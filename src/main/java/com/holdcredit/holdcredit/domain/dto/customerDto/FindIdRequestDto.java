package com.holdcredit.holdcredit.domain.dto.customerDto;

import lombok.Data;


@Data
public class FindIdRequestDto {

    private String customer_name;
    private Long phone_num;


}
