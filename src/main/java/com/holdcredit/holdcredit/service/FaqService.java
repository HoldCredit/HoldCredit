package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.domain.dto.FaqDto.FaqUpdateDto;

public interface FaqService {
    Long create(final FaqRequestDto faqRequestDto);
    Long update(final FaqUpdateDto faqUpdateDto, final Long faq_no);
    void delete(final Long faq_no);
}
