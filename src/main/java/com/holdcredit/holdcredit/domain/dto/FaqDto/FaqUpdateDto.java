package com.holdcredit.holdcredit.domain.dto.FaqDto;

import lombok.*;

@Getter
@NoArgsConstructor
public class FaqUpdateDto {
    private String title;
    private String content;

    /* 글 수정 */
    @Builder
    public FaqUpdateDto( String title, String content) {
        this.title = title;
        this.content = content;
    }
}

