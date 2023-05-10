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

import java.time.LocalDate;
import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
public class customerControllerTest {

    //테스트 오류났음.,,,,,,,,! 이유 아직 못찾음,,, 쮸

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
                .customer_id("gj09")
                .password("240")
                .customer_name("쮸")
                .birth(LocalDate.of(1996, 7, 18))
                .gender("F")
                .phone_num(1042933333L)
                .email("jju240@tistory.com")
                .joinDate(LocalDateTime.now())
                .admin_level(0L)
                .build();

        String json = object.writeValueAsString(dto);

        // When: URL 매핑
        mockMvc.perform(MockMvcRequestBuilders.post("/customer/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andDo(print());

 /*       // Then 몰라 오류남
        if (customerRepository.count() > 0) {
            CustomerEntity customer = customerRepository.findAll().get(0);
            // 테스트에 필요한 작업 수행}*/

    }
}
