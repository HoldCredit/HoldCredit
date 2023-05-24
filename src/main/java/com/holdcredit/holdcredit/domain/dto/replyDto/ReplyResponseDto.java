package com.holdcredit.holdcredit.domain.dto.replyDto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.entity.Qna;
import lombok.Data;

@Data
public class ReplyResponseDto {

    private Long id;
    private Long qnaNo;
    private String reply;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;



}
