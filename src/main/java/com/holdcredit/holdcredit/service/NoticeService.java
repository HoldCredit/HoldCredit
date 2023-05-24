package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.List;

public interface NoticeService {
    //게시글 리스트, 페이징 처리
    Page<NoticeResponseDto> list(Pageable pageable) throws Exception;

    //게시글 검색기능
    Page<NoticeResponseDto> findByContentContaining(String keyword, Pageable pageable);

    //글 상세보기
    NoticeResponseDto getNotice(Long id);

    //글 조회수 기능
    @Transactional
    void updateHits(Long id);

    //글 등록
    Notice saveNotice(NoticeRequestDto requestDto);

    //글 수정
    void updateNotice(Long id, NoticeRequestDto requestDto);

    //글 삭제
    void deleteNotice(Long id);
}
