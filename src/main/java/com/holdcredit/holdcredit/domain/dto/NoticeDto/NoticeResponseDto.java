package com.holdcredit.holdcredit.domain.dto.NoticeDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import lombok.*;

import java.time.LocalDate;

/* 게시글 정보를 리턴*/
@Data
@NoArgsConstructor

public class NoticeResponseDto {

    private Long notice_no;
    private String title;
    private String customer_name;
    private LocalDate reg_date;
    private Long hits;
    private String attach;
}
