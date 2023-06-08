package com.holdcredit.holdcredit.domain.dto.boardDto;

import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import lombok.*;

import java.util.List;

/* 게시글 정보를 리턴*/
@Data
@Builder
public class QnaResponseDto {

    private Long id;
    private String title;
    private String writer;
    private String content;
    private String pwd;
    private int hits;
    private java.util.Date createDate;
    private java.util.Date lastModifiedDate;
    private List<ReplyResponseDto> reply;

}
