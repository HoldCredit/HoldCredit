package com.holdcredit.holdcredit.domain.dto.BoardDto;


import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import lombok.*;

import java.util.Date;
import java.util.List;

/* 게시글 정보를 리턴*/
@Data
@Builder
public class NoticeResponseDto {

    private Long id;
    private String title;
    private String content;
    private String pwd;
    private int hits;
    private Date createDate;
    private Date lastModifiedDate;
    private List<Attach> attach;


}
