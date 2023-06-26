package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
import com.holdcredit.holdcredit.domain.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface QnaService {
    //게시글 리스트, 페이징 처리
    Page<QnaResponseDto> list(Pageable pageable) throws Exception;

    //게시글 검색 기능
    @Transactional
    Page<QnaResponseDto> searchQna(String field, String keyword, Pageable pageable);

    //게시글 상세조회
    QnaResponseDto getQna(Long id);

    @Transactional
    void updateHits(Long id);

    //등록
    Qna saveQna(QnaRequestDto requestDto);

    //수정
    void updateQna(Long id, QnaRequestDto requestDto);

    //삭제
    void deleteQna(Long id);
}
