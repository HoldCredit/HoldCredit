package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyRequestDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.Reply;
import com.holdcredit.holdcredit.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ReplyController {

    private final ReplyService replyService;

    //댓글 등록
    @PostMapping("/Qna/{id}/Reply")
    public ResponseEntity<?> replySave(@PathVariable Long id, Long customerNo, @RequestBody ReplyRequestDto requestDto){

        replyService.replySave(id, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    //댓글 수정
    @PutMapping("/Qna/{id}/Reply/{replyId}")
    public ResponseEntity<?> replyUpdate(@PathVariable Long replyId, @RequestBody ReplyRequestDto requestDto){

        replyService.replyUpdate(replyId, requestDto);

        return new ResponseEntity<>(HttpStatus.OK);

    }

    //댓글 삭제
    @DeleteMapping("/Qna/{id}/Reply/{replyId}")
    public ResponseEntity<?> deleteQna(@PathVariable Long replyId) {
        replyService.deleteReply(replyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
