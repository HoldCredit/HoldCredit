package com.holdcredit.holdcredit.data.dto.FaqDto;

import com.holdcredit.holdcredit.data.entity.FaqEntity;
import lombok.Builder;
import lombok.Getter;
//dto는 자주 변경해도 영향x
//게시글 정보를 리턴함
@Getter
public class FaqResponseDto {
    private final Long fNo;
    //    private Long userNo;
    private final String title;
    private final String content;

    /* 조회한 entity -> dto */
    // entity 일부만 사용해 생성자로 값을 받아 대입
    public FaqResponseDto(FaqEntity faq){
        this.fNo = faq.getFNo();
//        this.userNo=faq.getUserNo();
        this.title = faq.getTitle();
        this.content = faq.getContent();
    }

    @Builder //final: readonly 속성
    public FaqResponseDto(Long fNo, String title, String content){
        this.fNo = fNo;
        this.title = title.substring(0,Math.min(title.length(),20)); //최대길이 20글자로 끊음
        this.content = content;
    }

}
