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
    private float pre_RT;
    //대출 횟수
    private Long L00000001;
    //대출금액
    private Long L00000002;
    //연체 횟수
    private Long PS0001897;
}
