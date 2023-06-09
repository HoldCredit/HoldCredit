package com.holdcredit.holdcredit.domain.dto.boardDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Qna;
import lombok.*;

////게시글 생성과 수정을 요청
@Data
@Builder
public class QnaRequestDto {

    private Long id;
    private Long customerNo;
    private String title;
    private String writer;
    private String content;
    private String pwd;
    private int hits;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;

  /*  public Qna toEntity(QnaRequestDto dto) {
        return Qna.builder()
                .title(dto.getTitle())
                .writer(dto.getWriter())
                .id(dto.getId())
                .content(dto.getContent())
                .hits(dto.getHits())
                .pwd(dto.getPwd())
                .createDate(dto.getCreateDate())
                .build();
    }*/
}


