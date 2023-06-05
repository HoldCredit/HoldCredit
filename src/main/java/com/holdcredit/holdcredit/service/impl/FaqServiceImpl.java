package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.boarddto.FaqRequestDto;
import com.holdcredit.holdcredit.domain.dto.boarddto.FaqResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Faq;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.FaqRepository;
import com.holdcredit.holdcredit.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class FaqServiceImpl implements FaqService {
    private final FaqRepository faqRepository;
    private final CustomerRepository customerRepository;

    @Override
    public Page<FaqResponseDto> list(Pageable pageable) {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Faq> faqPage = faqRepository.findAll(paging);
        return faqPage.map(Faq::responseDto);
    }

    @Override
    public void postFaq(FaqRequestDto faqRequestDto) {
        Customer findCustomer = customerRepository.findByCustomerName(faqRequestDto.getName()).get();
        Faq faq = Faq.builder()
                .customer(findCustomer)
                .title(faqRequestDto.getTitle())
                .content(faqRequestDto.getContent())
                .build();
        faqRepository.save(faq);
    }

    @Override
    public void deleteFaq(Long id) {
        faqRepository.deleteById(id);
    }
}


