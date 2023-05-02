package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FaqController {
    private final FaqService faq;

    /* 글 작성 */      //+@LoginUser 유저정보 전달
    @PostMapping("/faq/write")
    public Long create(@RequestBody FaqRequestDto faqReq){ //HTTP 요청 -> 자바 객체 변환
        return faq.create(faqReq);
    }

    /* 글 목록 */
//    @GetMapping("/faq/list")
//    public List<FaqEntity> getFaqEntityList(){
//        return FaqEntity.getFaqEntityList();
//    }




}
