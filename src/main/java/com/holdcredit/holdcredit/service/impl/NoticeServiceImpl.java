package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.repository.AttachRepository;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.NoticeRepository;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final AttachRepository attachRepository;
    private final CustomerRepository customerRepository;

    //게시글 리스트, 페이징 처리
    @Override
    @Transactional
    public Page<NoticeResponseDto> list(Pageable pageable) throws Exception {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Notice> noticePage = noticeRepository.findAll(paging);
        return noticePage.map(Notice::responseDto);
    }
    //게시글 검색기능
    @Override
    @Transactional
    public Page<NoticeResponseDto> searchNotices(String field, String keyword, Pageable pageable) {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Notice> noticePage;

        switch (field) {
            case "content":
                noticePage = noticeRepository.findByContentContaining(keyword, paging);
                break;
            case "title":
                noticePage = noticeRepository.findByTitleContaining(keyword, paging);
                break;
            case "writer":
                noticePage = noticeRepository.findByWriterContaining(keyword, paging);
                break;
            default:
                throw new IllegalArgumentException("Invalid search field: " + field);
        }

        return noticePage.map(Notice::responseDto);
    }
    //게시글 상세조회
    @Override
    @Transactional
    public NoticeResponseDto getNotice(Long id) {
        Optional<Notice> noticeOptional = noticeRepository.findById(id);
        if (noticeOptional.isPresent()) {
            Notice notice = noticeOptional.get();
            NoticeResponseDto responseDto = notice.responseDto(notice);

            List<Attach> attachList = notice.getAttach();

            for (Attach attach : attachList) {
                attach.setPath("C:\\upload\\" + attach.getStoredFileName());
            }

            responseDto.setAttach(attachList);

            return responseDto;
        } else {

            throw new NoSuchElementException("Notice not found with id: " + id);
        }
    }

    @Override
    @Transactional
    public void updateHits(Long id) {
        Notice notice = noticeRepository.findById(id).get();
        notice.countHits(notice.getHits() + 1);
        noticeRepository.save(notice);
    }

    //게시글 등록, 첨부파일 업로드
    @Override
    public void saveNotice(NoticeRequestDto requestDto) throws IOException {
        Customer findCustomer = customerRepository.findById(requestDto.getCustomerNo()).get();

        if (requestDto.getAttach() == null || requestDto.getAttach().isEmpty()) {
            Notice notice = Notice.toEntity(requestDto);

            notice.setCustomer(findCustomer);
            noticeRepository.save(notice);

        } else {

            Notice notice = Notice.toSaveAttach(requestDto);
            notice.setCustomer(findCustomer);

            Long noticeNo = noticeRepository.save(notice).getId();
            Notice board = noticeRepository.findById(noticeNo).orElse(null);

            for(MultipartFile file: requestDto.getAttach()) {

                String originFilename = file.getOriginalFilename();
                String storedFileName = System.currentTimeMillis() + "_" + originFilename;
                String savePath = "C:\\upload\\" + storedFileName;
                file.transferTo(new File(savePath));

                if (board != null) {
                    Attach attach = Attach.toEntity(board, originFilename, storedFileName, savePath);
                    attachRepository.save(attach);
                }
            }
        }
    }
    //게시글 수정
    @Override
    public void updateNotice(Long id, NoticeRequestDto requestDto) {
        Notice notice = noticeRepository.findById(id).get();
        notice.updateNotice(requestDto);
        noticeRepository.save(notice);
    }

    //게시글 삭제
    @Override
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }




}
