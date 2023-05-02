package com.holdcredit.holdcredit.data.dto.FaqDto;

import com.holdcredit.holdcredit.data.entity.FaqEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

////게시글 생성과 수정을 요청
@Getter
@ToString
@NoArgsConstructor //기본 생성자

public class FaqRequestDto {
    private String content;
    private String title;

    @Builder
    public FaqRequestDto(String title, String content){ //Customer?
        this.title = title;
        this.content = content;
    }

    /* Dto -> Entity 저장 */
    public FaqEntity toEntity(){
        return FaqEntity.builder().title(title).content(content).build();
    }



}
