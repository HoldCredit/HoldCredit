package com.holdcredit.holdcredit.controllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqUpdateDto;
import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.repository.CustomerRepository;
import com.holdcredit.holdcredit.data.repository.FaqRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.hamcrest.Matchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc  //server 실행 없이 @service @Repository 태스트 가능
@SpringBootTest
//@Transactional
public class faqControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper object;  //dto 객체 -> JSON 타입 변환
    @Autowired
    FaqRepository faqRepository;
    @Autowired
    CustomerRepository customerRepository;

    //#0 !! db에 테이블이 저장되어있다면, properties의 dd1-auto=none 변경 !!
    //#1. 주입받을 entity
    public static FaqEntity faq (CustomerEntity customerEntity, String title, String content){
        return FaqEntity.builder().customerEntity(customerEntity).title(title).content(content).build();
    }

    @Test
    @DisplayName("글작성 테스트")
    public void createTest() throws Exception {
        // #2 customer & faq db에 주입
        CustomerEntity customerEntity = CustomerEntity.builder()
                .userNo(1004L)
                .Id("gj09")
                .pwd("240")
                .name("쮸")
                .pNum(123L)
                .rNum(456L)
                .adress("용인살아요")
                .email("jju240@tistory.com")
                .joinDate("230502")
                .build();

        customerRepository.save(customerEntity);

        String json = object.writeValueAsString(faqRepository.save(faq(customerEntity, "제목1", "내용1")));

        /* #3 url 매핑 */
        mockMvc.perform(MockMvcRequestBuilders.post("/faq/write")
                        .contentType(MediaType.APPLICATION_JSON).content(json))
                        .andExpect(status().isOk())
                        .andDo(print());

//        CustomerEntity findCustomer = customerRepository.findById(customerEntity.getUserNo()).get();

        //then
        FaqEntity faqEntity = faqRepository.findAll().get(0);
        assertThat(faqEntity.getCustomerEntity().getUserNo()).isEqualTo(customerEntity.getUserNo());

    }


    @Test
    @DisplayName("글수정 테스트")
    public void updateTest() throws Exception {
            // #1. 주입받을 entity
            CustomerEntity customerEntity = CustomerEntity.builder()
                    .userNo(1005L)
                    .Id("gj09")
                    .pwd("240")
                    .name("쮸")
                    .pNum(123L)
                    .rNum(456L)
                    .adress("용인살아요")
                    .email("jju240@tistory.com")
                    .joinDate("230502")
                    .build();
            customerRepository.save(customerEntity);

            FaqEntity faq = FaqEntity.builder()
                    .customerEntity(customerEntity)
                    .title("안녕")
                    .content("바보")
                    .build();
            faqRepository.save(faq);

            FaqUpdateDto faqUpdateDto = FaqUpdateDto.builder()
                    .title("제목수정")
                    .content("내용수정")
                    .build();

            String json = object.writeValueAsString(faqUpdateDto);

            mockMvc.perform(MockMvcRequestBuilders.put("/faq/write/{fNo}", faq.getFaq_no())
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(json))
                    .andExpect(status().isOk())
                    .andDo(print());

            FaqEntity updatedFaq = faqRepository.findById(faq.getFaq_no()).orElseThrow();
            assertThat(updatedFaq.getTitle()).isEqualTo("제목수정");
            assertThat(updatedFaq.getContent()).isEqualTo("내용수정");
        }


    @Test
    @DisplayName("글삭제 테스트")
    public void deleteTest() throws Exception {

        CustomerEntity customerEntity = CustomerEntity.builder()
                .userNo(1006L)
                .Id("gj09")
                .pwd("240")
                .name("쮸")
                .pNum(123L)
                .rNum(456L)
                .adress("용인살아요")
                .email("jju240@tistory.com")
                .joinDate("230502")
                .build();
        customerRepository.save(customerEntity);

        FaqEntity faq = FaqEntity.builder()
                .customerEntity(customerEntity)
                .title("안녕")
                .content("바보")
                .build();
        faqRepository.save(faq);



        mockMvc.perform(MockMvcRequestBuilders.delete("/faq/write/{fNo}", faq.getFaq_no())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }





    }



