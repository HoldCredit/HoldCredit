package com.holdcredit.holdcredit.serviceTest;

import com.holdcredit.holdcredit.domain.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.domain.entity.Faq;
import com.holdcredit.holdcredit.repository.FaqRepository;
import com.holdcredit.holdcredit.service.impl.FaqServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
public class faqServiceTest {
    @Mock
    private FaqServiceImpl faqServiceImpl;
    @Mock
    private FaqRepository faqRepository;

    @Test @DisplayName("글작성")
    public void faqWrite(){
        //give
        FaqRequestDto FaqCreate = FaqRequestDto.builder()
                .title("제목")
                .content("내용")
                .build();

        //when  //create() 사용하여 DTO객체 넣음
        faqServiceImpl.create(FaqCreate);

        //then
        Faq faq = faqRepository.findAll().get(0);

    }


}
