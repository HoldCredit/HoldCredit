package com.holdcredit.holdcredit.domain.dto.NoticeDto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/* 게시글 정보를 리턴*/
@Data
@Builder
public class NoticeResponseDto extends Date {

    private Long id;
    private String title;
    private Customer customer_name;
    private String content;
    private String pwd;
    private Long hits;
    private java.util.Date createDate;
    private java.util.Date lastModifiedDate;
    private List<Attach> attach;
}
