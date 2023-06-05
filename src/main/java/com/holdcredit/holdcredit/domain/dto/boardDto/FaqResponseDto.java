package com.holdcredit.holdcredit.domain.dto.boarddto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class FaqResponseDto {

    private Long id; // faq 번호
    private String title;
    private String content;


}
