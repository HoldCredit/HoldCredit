package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;

import java.util.List;

public interface NoticeService {

    List<NoticeResponseDto> getAllNotice();

    List<NoticeResponseDto> noticeDTO(List<Notice> noticeEntity);
}
