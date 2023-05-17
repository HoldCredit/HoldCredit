package com.holdcredit.holdcredit.domain.dto.NoticeDto;

import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.domain.entity.Notice;
import lombok.*;

import java.util.Date;
import java.util.List;

////게시글 생성과 수정을 요청
@Data
@Builder
public class NoticeRequestDto extends Date {

    private String title;
    private Long id;
    private String content;
    private String pwd;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;
    private List<Attach> attach;

    public Notice toEntity(NoticeRequestDto dto) {
        return Notice.builder()
                .title(dto.getTitle())
                .id(dto.getId())
                .content(dto.getContent())
                .pwd(dto.getPwd())
                .createDate(dto.getCreateDate())
                .lastModifiedDate(dto.getLasModifiedDate())
                .attach(dto.getAttach())
                .build();
    }
}


