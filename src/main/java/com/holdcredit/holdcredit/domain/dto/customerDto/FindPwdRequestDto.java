package com.holdcredit.holdcredit.domain.dto.customerDto;

import lombok.Data;

@Data
public class FindPwdRequestDto {
    private String customer_name;
    private String email;

}