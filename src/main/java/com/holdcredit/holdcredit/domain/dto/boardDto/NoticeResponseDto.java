package com.holdcredit.holdcredit.domain.dto.boardDto;


import com.holdcredit.holdcredit.domain.entity.Attach;
import lombok.*;

import java.util.Date;
import java.util.List;

/* 게시글 정보를 리턴*/
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NoticeResponseDto {

    private Long id; //게시판 번호
    private String writer; //회원 이름
    private String title;
    private String content;
    private String pwd;
    private int hits;
    private Date createDate;
    private Date lastModifiedDate;
    private String path;
    private List<Attach> attach;


}
