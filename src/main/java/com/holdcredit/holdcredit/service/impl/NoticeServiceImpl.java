package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.repository.NoticeRepository;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;

    //게시글 리스트, 페이징 처리
    @Override
    public Page<NoticeResponseDto> list(Pageable pageable) throws Exception {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Notice> noticePage = noticeRepository.findAll(paging);
        return noticePage.map(Notice::responseDto);
    }
    //게시글 검색기능
    @Override
    public Page<NoticeResponseDto> findByContentContaining(String keyword, Pageable pageable) {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Notice> noticePage = noticeRepository.findByContentContaining(keyword, paging);
        return noticePage.map(Notice::responseDto);
    }

    //게시글 상세조회
    @Override
    public NoticeResponseDto getNotice(Long id) {
        Notice notice = noticeRepository.findById(id).get();
        NoticeResponseDto responseDto = notice.responseDto();
        return responseDto;

    }

    @Override
    @Transactional
    public void updateHits(Long id) {
        Notice notice = noticeRepository.findById(id).get();
        notice.countHits(notice.getHits() + 1);
        noticeRepository.save(notice);
    }

    //등록
    @Override
    public Notice saveNotice(NoticeRequestDto requestDto){

        return noticeRepository.save(requestDto.toEntity(requestDto));
    }
    //수정
    @Override
    public void updateNotice(Long id, NoticeRequestDto requestDto) {
        Notice notice = noticeRepository.findById(id).get();
        notice.updateNotice(requestDto);
        noticeRepository.save(notice);
    }


    @Override
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }




}
