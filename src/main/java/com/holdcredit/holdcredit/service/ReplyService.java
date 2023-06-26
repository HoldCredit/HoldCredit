package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyRequestDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.Reply;

import javax.transaction.Transactional;
import java.util.List;

public interface ReplyService {

    //댓글 정보 가져오기
    List<ReplyResponseDto> replyList(Long id);

    ReplyResponseDto responseDto(Reply reply);

    //댓글 등록
    @Transactional
    Long replySave(Long id, ReplyRequestDto dto);

    //댓글 수정
    void replyUpdate(Long id, ReplyRequestDto requestDto);

    //댓글 삭제
    void deleteReply(Long id);
}
