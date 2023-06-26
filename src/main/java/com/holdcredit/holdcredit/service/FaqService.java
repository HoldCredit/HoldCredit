package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.boardDto.FaqRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.FaqResponseDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;

public interface FaqService {

    // 리스트, 페이징
    Page<FaqResponseDto> list(Pageable pageable);

    @Transactional
    Page<FaqResponseDto> searchFaq(String field, String keyword, Pageable pageable);

    // 등록
    void postFaq(FaqRequestDto faqRequestDto);

    // 삭제
    void deleteFaq(Long id);
}
