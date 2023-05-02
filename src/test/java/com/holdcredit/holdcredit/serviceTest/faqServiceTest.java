package com.holdcredit.holdcredit.serviceTest;

import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.repository.FaqRepository;
import com.holdcredit.holdcredit.service.FaqService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class faqServiceTest {
    @Autowired
    private FaqService faqService;
    @Autowired
    private FaqRepository faqRepository;

    @Test @DisplayName("글작성")
    public void faqWrite(){
        //give
        FaqRequestDto FaqCreate = FaqRequestDto.builder()
                .title("제목")
                .content("내용")
                .build();

        //when  //create() 사용하여 DTO객체 넣음
        faqService.create(FaqCreate);

        //then
        FaqEntity faq = faqRepository.findAll().get(0);

    }


}
