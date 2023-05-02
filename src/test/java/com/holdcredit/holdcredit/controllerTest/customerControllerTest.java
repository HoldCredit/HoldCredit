package com.holdcredit.holdcredit.controllerTest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.holdcredit.holdcredit.data.dto.customerDto.CustomerDto;
import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import com.holdcredit.holdcredit.data.repository.CustomerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@AutoConfigureMockMvc
@SpringBootTest
public class customerControllerTest {


        @Autowired
        MockMvc mockMvc;
        @Autowired
        ObjectMapper object;  //dto 객체 -> JSON 타입 변환
        @Autowired
        CustomerRepository customerRepository;
        /* 글작성 */
        @Test
        @DisplayName("회원 정보 입력 테스트")
        public void createTest() throws Exception {
            //give
            CustomerDto dto = CustomerDto.builder()
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

            String json = object.writeValueAsString(dto);

            //when :url 매핑
            mockMvc.perform(MockMvcRequestBuilders.post("/customer/save").contentType(MediaType.APPLICATION_JSON).content(json))
                    .andExpect(status().isOk())
                    .andDo(print());

            //then
            CustomerEntity customer = customerRepository.findAll().get(0);


        }
}
