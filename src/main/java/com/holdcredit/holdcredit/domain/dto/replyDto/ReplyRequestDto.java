package com.holdcredit.holdcredit.domain.dto.replyDto;

import com.holdcredit.holdcredit.domain.entity.Qna;
import com.holdcredit.holdcredit.domain.entity.Reply;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReplyRequestDto {

    private Long id;
    private Qna qnaNo;
    private Long customerNo;
    private String writer;
    private String reply;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;


    public Reply toEntity(ReplyRequestDto dto) {
        return Reply.builder()
                .id(dto.getId())
                .qna(dto.getQnaNo())
                .writer(dto.getWriter())
                .reply(dto.getReply())
                .createDate(dto.getCreateDate())
                .lastModifiedDate(dto.getLasModifiedDate())
                .build();
    }
}
