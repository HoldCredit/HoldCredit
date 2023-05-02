package com.holdcredit.holdcredit.controllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.holdcredit.holdcredit.controller.FaqController;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.repository.FaqRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;
import static org.springframework.test.util.AssertionErrors.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
@Transactional
public class faqControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper object;  //dto 객체 -> JSON 타입 변환
    @Autowired
    FaqRepository faqRepository;


    /* 글작성 */
    @Test
    @DisplayName("글작성 테스트")
    public void createTest() throws Exception {
        //give
        FaqRequestDto dto = FaqRequestDto.builder()
                .title("제목")
                .content("내용")
                .build();

        String json = object.writeValueAsString(dto);

        //when :url 매핑
        mockMvc.perform(MockMvcRequestBuilders.post("/faq/write").contentType(MediaType.APPLICATION_JSON).content(json))
                .andExpect(status().isOk())
                .andDo(print());

        //then
        FaqEntity faq = faqRepository.findAll().get(0);
    }

    /* 글 목록 */


}