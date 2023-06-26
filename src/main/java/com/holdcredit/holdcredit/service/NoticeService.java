package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.io.IOException;

public interface NoticeService {
    //게시글 리스트, 페이징 처리
    Page<NoticeResponseDto> list(Pageable pageable) throws Exception;



    //게시글 검색기능
    @Transactional
    Page<NoticeResponseDto> searchNotices(String field, String keyword, Pageable pageable);

    //글 상세보기
    NoticeResponseDto getNotice(Long id);

    //글 조회수 기능
    @Transactional
    void updateHits(Long id);

    //글 등록
    void saveNotice(NoticeRequestDto requestDto) throws IOException;

    //글 수정
    void updateNotice(Long id, NoticeRequestDto requestDto);

    //글 삭제
    void deleteNotice(Long id);
}
