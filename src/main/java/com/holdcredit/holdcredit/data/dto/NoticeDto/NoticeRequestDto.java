package com.holdcredit.holdcredit.data.dto.NoticeDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.entity.NoticeEntity;
import lombok.*;

////게시글 생성과 수정을 요청
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NoticeRequestDto {
    private CustomerEntity customerEntity;
    private String title;
    private String content;
    private String attach;


    /* Dto -> Entity 저장 */
    public NoticeEntity toEntity(){
        return NoticeEntity.builder().customerEntity(customerEntity).title(title).content(content).attach(attach).build();
    }



}
