package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.boardDto.QnaRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.Qna;
import com.holdcredit.holdcredit.service.QnaService;
import com.holdcredit.holdcredit.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class QnaController {
    private final QnaService qnaService;
    private final ReplyService replyService;
    //게시글 리스트
    @GetMapping("/Qna")
    public Page<QnaResponseDto> list(Pageable pageable, String keyword) throws Exception {

        Page<QnaResponseDto> qnaList = null;

        if(keyword == null){
            qnaList = qnaService.list(pageable);
        }else {
            qnaList = qnaService.findByContentContaining(keyword, pageable);
        }

        return qnaList;
    }
    //게시글 상세조회
    @GetMapping("/Qna/{id}")
    public ResponseEntity<QnaResponseDto> getQna(@PathVariable Long id) {
        QnaResponseDto responseDto = qnaService.getQna(id);
        List<ReplyResponseDto> reply = replyService.replyList(id);
        responseDto.setReply(reply);
        return ResponseEntity.ok(responseDto);
    }
    //게시글 조회수
    @PutMapping("/qnaHits/{id}")
    public ResponseEntity<?> updateHits(@PathVariable Long id){
        qnaService.updateHits(id);
        return ResponseEntity.ok().build();
    }
    //등록
    @PostMapping("/Qna")
    public Qna saveQna(@RequestBody QnaRequestDto qnaRequestDto){
        return qnaService.saveQna(qnaRequestDto);
    }
    //수정
    @PutMapping("/Qna/{id}")
    public ResponseEntity<?> updateQna(@PathVariable Long id, @Validated @RequestBody QnaRequestDto requestDto) {
        qnaService.updateQna(id, requestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/Qna/{id}")
    public ResponseEntity<?> deleteQna(@PathVariable Long id) {
        qnaService.deleteQna(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
