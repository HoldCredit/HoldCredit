package com.holdcredit.holdcredit.domain.dto.boardDto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

////게시글 생성과 수정을 요청
@Data
public class NoticeRequestDto {

    private Long id;

    private Long customerNo; //회원번호
    private String writer;
    private String title;
    private String content;
    private String pwd;
    private int hits;
    private java.util.Date createDate;
    private java.util.Date lasModifiedDate;
    private List<MultipartFile> attach;
    private List<String> originFileName;
    private List<String> storedFileName;
    private int fileAttached;

}


