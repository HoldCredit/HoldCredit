package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqResponseDto;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.repository.FaqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor //생성자로 주입하는 방식 권장
public class FaqService {
    private final FaqRepository faqRepository;

    //게시글 작성 ((+관리자만 작성
    @Transactional
    public Long create(final FaqRequestDto faqReq){
        FaqEntity faq = faqRepository.save(faqReq.toEntity());
        return faq.getFNo();
    } //create() 실행하여 entity 저장 -> 종료 후 fNo 리턴


    // 게시판 리스트 ((+페이징 +검색
//    @Transactional //db에 자동 처리
//    public List<FaqResponseDto> findAll(){      //list 안의 entity를 responseDto로 변경히여 생성
//        Sort sort = Sort.by(Sort.Direction.DESC,"fNo"); //내림차순 정렬
//        List<FaqEntity> faqList = faqRepository.findAll(sort);
//        return faqList.stream().map(FaqResponseDto::new).collect(Collectors.toList());
//    }



}


