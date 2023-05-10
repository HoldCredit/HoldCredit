package com.holdcredit.holdcredit.data.dto.FaqDto;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import lombok.*;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.Date;

////게시글 생성과 수정을 요청
@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@Component
public class FaqRequestDto {
    private CustomerEntity customerEntity;
    private String title;
    private String content;

    /* 글 생성 */
    @Builder
    public FaqRequestDto(CustomerEntity customerEntity, String title, String content){
        this.customerEntity = customerEntity;
        this.title = title;
        this.content = content;
    }



    /* Dto -> Entity 저장 */
    public FaqEntity toEntity(){
        return FaqEntity.builder().customerEntity(customerEntity).title(title).content(content).build();
    }



}

