package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.boardDto.FaqResponseDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.FaqRequestDto;
import com.holdcredit.holdcredit.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class FaqController {
    private final FaqService faqService;

    @GetMapping("/faq")
    public Page<FaqResponseDto> list(Pageable pageable, String keyword, String field) throws Exception {

        Page<FaqResponseDto> faqList = null;

        if(keyword == null){
            faqList = faqService.list(pageable);
        }else {
            faqList = faqService.searchFaq(field, keyword, pageable);
        }

        return faqList;
    }

    @PostMapping("/faq")
    public ResponseEntity<FaqResponseDto> post(@RequestBody FaqRequestDto faqRequestDto) {
        faqService.postFaq(faqRequestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/faq/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        faqService.deleteFaq(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
