package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.data.dto.FaqDto.FaqRequestDto;
import com.holdcredit.holdcredit.data.dto.FaqDto.FaqUpdateDto;
import com.holdcredit.holdcredit.data.entity.FaqEntity;
import com.holdcredit.holdcredit.data.repository.FaqRepository;
import com.holdcredit.holdcredit.service.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor //생성자로 주입하는 방식 권장
public class FaqServiceImpl implements FaqService {
    private final FaqRepository faqRepository;

    /* 글 작성 ((+관리자만 작성 */
    @Override
    @Transactional //db자동 커밋
    public Long create(final FaqRequestDto faqReq){
        FaqEntity faq = faqRepository.save(faqReq.toEntity());
        return faq.getFaq_no();
    } //create() 실행하여 entity 저장 -> 종료 후 fNo 리턴


    /* 글 수정 */
    @Override
    @Transactional
    public Long update(final FaqUpdateDto faqUpdateDto, final Long faq_no){
        FaqEntity faqEntity = faqRepository.findById(faq_no).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id="+faq_no));

        faqEntity.update(faqUpdateDto.getTitle(), faqUpdateDto.getContent());
        faqRepository.save(faqEntity);

        return faqEntity.getFaq_no();
    } //영속성으로 entity 객체의 값만 변경하면 자동으로 변경사항 반영됨 -> repository.update() 필요없음


    /* 글 삭제 */
    @Override
    @Transactional
    public void delete(final Long faq_no){
        faqRepository.deleteById(faq_no);

    }


    // 게시판 리스트 ((+페이징 +검색
//    @Transactional //db에 자동 처리
//    public List<FaqResponseDto> findAll(){      //list 안의 entity를 responseDto로 변경히여 생성
//        Sort sort = Sort.by(Sort.Direction.DESC,"fNo"); //내림차순 정렬
//        List<FaqEntity> faqList = faqRepository.findAll(sort);
//        return faqList.stream().map(FaqResponseDto::new).collect(Collectors.toList());
//    }



}


