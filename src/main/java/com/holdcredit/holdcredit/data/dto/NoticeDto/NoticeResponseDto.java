package com.holdcredit.holdcredit.data.dto.NoticeDto;

import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.entity.NoticeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
/* 게시글 정보를 리턴*/
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeResponseDto {

    private Long notice_no;
    private Long customerEntity;
    private String title;
    private String content;
    private Long hits;
    private String attach;

    /* 조회한 entity -> dto */
    public NoticeResponseDto(NoticeEntity noticeEntity){
        this.notice_no = noticeEntity.getNotice_no();
        this.customerEntity = noticeEntity.getCustomerEntity().getUserNo();
        this.title = noticeEntity.getTitle();
        this.content = noticeEntity.getContent();
        this.hits = noticeEntity.getHits();
        this.attach = noticeEntity.getAttach();
    }

}