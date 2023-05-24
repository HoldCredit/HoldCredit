package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.boardDto.QnaRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
import com.holdcredit.holdcredit.domain.entity.Qna;
import com.holdcredit.holdcredit.repository.QnaRepository;
import com.holdcredit.holdcredit.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {
    private final QnaRepository qnaRepository;
    //게시글 리스트, 페이징
    @Override
    public Page<QnaResponseDto> list(Pageable pageable) throws Exception {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Qna> qnaPage = qnaRepository.findAll(paging);
        return qnaPage.map(Qna::responseDto);
    }

    //게시글 검색 기능
    @Override
    public Page<QnaResponseDto> findByContentContaining(String keyword, Pageable pageable) {
        PageRequest paging = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("id").descending());
        Page<Qna> qnaPage = qnaRepository.findByContentContaining(keyword, paging);
        return qnaPage.map(Qna::responseDto);
    }

    //게시글 상세조회
    @Override
    public QnaResponseDto getQna(Long id) {
        Qna qna = qnaRepository.findById(id).get();
        QnaResponseDto responseDto = qna.responseDto();
        return responseDto;

    }

    //게시글 조회수
    @Override
    @Transactional
    public void updateHits(Long id) {
        Qna qna = qnaRepository.findById(id).get();
        qna.countHits(qna.getHits() + 1);
        qnaRepository.save(qna);
    }

    //등록
    @Override
    public Qna saveQna(QnaRequestDto requestDto){

        return qnaRepository.save(requestDto.toEntity(requestDto));
    }
    // 수정
    @Override
    public void updateQna(Long id, QnaRequestDto requestDto) {
        Qna qna = qnaRepository.findById(id).get();
        qna.updateQna(requestDto);
        qnaRepository.save(qna);
    }

    // 삭제
    @Override
    public void deleteQna(Long id) {
        qnaRepository.deleteById(id);
    }




}
