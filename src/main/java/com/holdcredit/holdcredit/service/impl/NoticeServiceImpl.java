package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.repository.NoticeRepository;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;


}
