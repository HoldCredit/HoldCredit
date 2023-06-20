package com.holdcredit.holdcredit.domain.dto.creditCardDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnonymousDataDTO {
    // 고객 정보 관련
    private Long customerNo;
    private String addYn;
    private String adNo;
    private String res_Add;
    private Long PRE_LMT;

    // 수익율 관련
    private Float PRE_RT;
    private Long L00000001;
    private Long L00000002;
    private Long PS0001897;
}
