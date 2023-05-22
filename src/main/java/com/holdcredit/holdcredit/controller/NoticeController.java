package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.BoardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.BoardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
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

    //게시글 리스트, 페이징처리
    @GetMapping
    public Page<NoticeResponseDto> list(Pageable pageable, String keyword) throws Exception {

        Page<NoticeResponseDto> noticeList = null;

        if(keyword == null){
            noticeList = noticeService.list(pageable);
        }else {
            noticeList = noticeService.findByContentContaining(keyword, pageable);
        }

        return noticeList;
    }
    //게시글 상세조회
    @GetMapping("/Notice/{id}")
    public ResponseEntity<NoticeResponseDto> getNotice(@PathVariable Long id) {
        NoticeResponseDto responseDto = noticeService.getNotice(id);

        return ResponseEntity.ok(responseDto);
    }
    //게시글 조회수
    @PutMapping("/hits/{id}")
        public ResponseEntity<?> updateHits(@PathVariable Long id){
            noticeService.updateHits(id);
            return ResponseEntity.ok().build();
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

    //삭제
    @DeleteMapping("/Notice/{id}")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
