package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.NoticeRepository;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final CustomerRepository customerRepository;

    //게시글 리스트
    @Override
    public List<NoticeResponseDto> getAllNotice(){
        List<Notice> notice = noticeRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return noticeList(notice);
    }
    //게시글 리스트 entity => dto 변환
    @Override
    public List<NoticeResponseDto> noticeList(List<Notice> noticeEntity) {
        return noticeEntity.stream()
                .map(entity -> NoticeResponseDto.builder()
                        .id(entity.getId())
                        .title(entity.getTitle())
                        .createDate(entity.getCreateDate())
                        .hits(entity.getHits())
                        .attach(entity.getAttach())
                        .build())
                .collect(Collectors.toList());
    }

    //게시글 상세조회
    @Override
    public NoticeResponseDto getNotice(Long id) {
        Notice notice = noticeRepository.findById(id).get();
        NoticeResponseDto responseDto = notice.responseDto();
        return responseDto;
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
