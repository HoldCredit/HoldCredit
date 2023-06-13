package com.holdcredit.holdcredit.domain.dto.customerDto;

import lombok.Data;

@Data
public class FindPwdResponseDto {
    private boolean success;
    private String message;
    private String tempPassword;

}


