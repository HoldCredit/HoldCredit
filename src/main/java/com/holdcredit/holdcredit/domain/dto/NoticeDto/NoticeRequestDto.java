package com.holdcredit.holdcredit.domain.dto.NoticeDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import lombok.*;

////게시글 생성과 수정을 요청
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeRequestDto {
    private Customer customerEntity;
    private String title;
    private String content;
    private String attach;


    /* Dto -> Entity 저장 */
    public Notice toEntity(){
        return Notice.builder().customerEntity(customerEntity).title(title).content(content).attach(attach).build();
    }



}
