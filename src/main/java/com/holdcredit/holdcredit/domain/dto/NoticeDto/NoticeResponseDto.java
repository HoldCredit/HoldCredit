package com.holdcredit.holdcredit.domain.dto.NoticeDto;

import com.holdcredit.holdcredit.domain.entity.Notice;
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

//    /* 조회한 entity -> dto */
//    public NoticeResponseDto(Notice noticeEntity){
//        this.notice_no = noticeEntity.getNotice_no();
//        this.customerEntity = noticeEntity.getCustomerEntity().getCustomer_no();
//        this.title = noticeEntity.getTitle();
//        this.content = noticeEntity.getContent();
//        this.hits = noticeEntity.getHits();
//        this.attach = noticeEntity.getAttach();
//    }

}
