package com.holdcredit.holdcredit.domain.dto.boardDto;

import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.domain.entity.Notice;
import lombok.*;


import java.util.List;

////게시글 생성과 수정을 요청
@Data
@Builder
public class NoticeRequestDto {

    private Long id;
    private String title;
    private String content;
    private String pwd;
    private int hits;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;
    private List<Attach> attach;

    public Notice toEntity(NoticeRequestDto dto) {
        return Notice.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .content(dto.getContent())
                .pwd(dto.getPwd())
                .hits(dto.getHits())
                .createDate(dto.getCreateDate())
                .attach(dto.getAttach())
                .build();
    }
}


