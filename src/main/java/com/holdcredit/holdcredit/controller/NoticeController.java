package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.service.FaqService;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NoticeController {
    private final NoticeService noticeService;

    @GetMapping("/Notice")
    public List<NoticeResponseDto> getNotice(){
        return noticeService.getAllNotice();
    }
}
