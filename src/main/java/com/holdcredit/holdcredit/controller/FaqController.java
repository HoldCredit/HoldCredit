package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqUpdateDto;
import com.holdcredit.holdcredit.service.FaqService;
import com.holdcredit.holdcredit.service.impl.FaqServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class FaqController {
    private final FaqService faqService;

    /* 글 작성 */      //+@LoginUser 유저정보 전달
    @PostMapping("/faq/write")
    public Long create(@RequestBody FaqRequestDto faqRequestDto){       //+ 현재 사용중인 user 세션 // HTTP 요청 -> 자바 객체 변환
        return faqService.create(faqRequestDto);
    }

    /* 글 수정 */
    @PutMapping("/faq/write/{fNo}")
    public Long update(@PathVariable Long faq_no, @RequestBody FaqUpdateDto faqUpdateDto) {
        return faqService.update(faqUpdateDto,faq_no);
    }

    /* 글 삭제 */
    @DeleteMapping("/faq/write/{fNo}")
    public void delete(@PathVariable Long faq_no){
        faqService.delete(faq_no);
    }

    /* 글 목록 */
//    @GetMapping("/faq/list")
//    public List<FaqEntity> getFaqEntityList(){
//        return FaqEntity.getFaqEntityList();
//    }




}
