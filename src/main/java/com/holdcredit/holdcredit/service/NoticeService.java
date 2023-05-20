package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;

import java.util.List;

public interface NoticeService {

    List<NoticeResponseDto> getAllNotice();

    List<NoticeResponseDto> noticeList(List<Notice> noticeEntity);

    NoticeResponseDto getNotice(Long id);

    Notice saveNotice(NoticeRequestDto requestDto);

    void updateNotice(Long id, NoticeRequestDto requestDto);

    void deleteNotice(Long id);
}
