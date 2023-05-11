package com.holdcredit.holdcredit.domain.dto.FaqDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Faq;
import lombok.*;
import org.springframework.stereotype.Component;

////게시글 생성과 수정을 요청
@Getter
@Setter
@ToString
@NoArgsConstructor //기본 생성자
@Component
public class FaqRequestDto {
    private Customer customerEntity;
    private String title;
    private String content;

    /* 글 생성 */
    @Builder
    public FaqRequestDto(Customer customerEntity, String title, String content){
        this.customerEntity = customerEntity;
        this.title = title;
        this.content = content;
    }



    /* Dto -> Entity 저장 */
    public Faq toEntity(){
        return Faq.builder().customerEntity(customerEntity).title(title).content(content).build();
    }



}

