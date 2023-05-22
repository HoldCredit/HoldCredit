package com.holdcredit.holdcredit.domain.dto.BoardDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import lombok.*;

import java.util.List;

/* 게시글 정보를 리턴*/
@Data
@Builder
public class QnaResponseDto {

    private Long id;
    private String title;
    private String content;
    private String pwd;
    private int hits;
    private java.util.Date createDate;
    private java.util.Date lastModifiedDate;

}
