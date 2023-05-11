package com.holdcredit.holdcredit.entityTest;

import com.holdcredit.holdcredit.domain.entity.Faq;
import com.holdcredit.holdcredit.repository.FaqRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class faqTest {
    @Autowired
    FaqRepository faqRepository;

    /* repository (db) 생성 확인 */
    @Test
    public void FaqTest(){
        String title = "제목";
        String content = "내용";

        faqRepository.save(Faq.builder().title(title).content(content).build());

        List<Faq> faqList = faqRepository.findAll();

        Faq faq= faqList.get(0);

        assertThat(faq.getTitle()).isEqualTo(title);
        assertThat(faq.getContent()).isEqualTo(content);

    }





}
