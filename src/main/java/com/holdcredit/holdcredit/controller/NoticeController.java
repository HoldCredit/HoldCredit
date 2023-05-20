package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.service.FaqService;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class NoticeController {
    private final NoticeService noticeService;

    //게시글 리스트
    @GetMapping("/Notice")
    public List<NoticeResponseDto> getNotice() {
        return noticeService.getAllNotice();
    }
    //게시글 상세조회
    @GetMapping("/Notice/{id}")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable Long id) {
        NoticeResponseDto responseDto = noticeService.getNotice(id);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }
    //등록
    @PostMapping("/Notice")
    public Notice saveNotice(@RequestBody NoticeRequestDto noticeRequestDto){
        return noticeService.saveNotice(noticeRequestDto);
    }
    //수정
    @PutMapping("/Notice/{id}")
    public ResponseEntity<?> updateNotice(@PathVariable Long id, @Validated @RequestBody NoticeRequestDto requestDto) {
        noticeService.updateNotice(id, requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @DeleteMapping("/Notice/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
