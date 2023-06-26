package com.holdcredit.holdcredit.domain.dto.boardDto;

import lombok.Data;

@Data
public class FaqRequestDto {

    private String name; //작성자 id
    private String title;
    private String content;

}
