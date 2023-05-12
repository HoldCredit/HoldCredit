package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.NoticeRepository;
import com.holdcredit.holdcredit.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {
    private final NoticeRepository noticeRepository;
    private final CustomerRepository customerRepository;
    @Override
    public List<NoticeResponseDto> getAllNotice(){
        List<Notice> notice = noticeRepository.findAll();
        return noticeDTO(notice);
    }

    @Override

    public List<NoticeResponseDto> noticeDTO(List<Notice> noticeEntity) {
        return noticeEntity.stream()
                .map(entity -> {
                    NoticeResponseDto dto = new NoticeResponseDto();
                    dto.setNotice_no(entity.getId());

                    Customer customer = customerRepository.findById(entity.getCustomer().getId())
                            .orElseThrow(() -> new EntityNotFoundException("Customer not found"));
                    dto.setCustomer_name(customer.getCustomerName());

                    dto.setTitle(entity.getTitle());
                    dto.setReg_date(entity.getReg_date());
                    dto.setHits(entity.getHits());
                    return dto;
                })
                .collect(Collectors.toList());
    }

}
