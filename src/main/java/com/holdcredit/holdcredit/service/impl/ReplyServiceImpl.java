package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyRequestDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Qna;
import com.holdcredit.holdcredit.domain.entity.Reply;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.QnaRepository;
import com.holdcredit.holdcredit.repository.ReplyRepository;
import com.holdcredit.holdcredit.service.ReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReplyServiceImpl implements ReplyService {

    private final ReplyRepository replyRepository;
    private final QnaRepository qnaRepository;

    private final CustomerRepository customerRepository;

    //댓글 정보 가져오기
    @Override
    public List<ReplyResponseDto> replyList(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("댓글 조회 실패: id가 null입니다.");
        }

        Qna qna = qnaRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "댓글 조회 실패: 해당 게시글이 존재하지 않습니다."));

        Long qnaNo = qna.getId();
        List<Reply> replies = replyRepository.findByQnaNo(qnaNo);

        return replies.stream()
                .map(this::responseDto)
                .collect(Collectors.toList());
    }

    @Override
    public ReplyResponseDto responseDto(Reply reply){
        return reply.responseDto();
    }

    //댓글 등록
    @Override
    @Transactional
    public Long replySave(Long id, ReplyRequestDto requestDto){

        Customer findCustomer = customerRepository.findById(requestDto.getCustomerNo()).get();

        Qna qna = qnaRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("댓글 쓰기 실패: 해당 게시글이 존재하지 않습니다."+ id));

        requestDto.setQnaNo(qna);

        Reply reply = requestDto.toEntity(requestDto);
        reply.setCustomer(findCustomer);

        replyRepository.save(reply);

        return requestDto.getId();
    }

    //댓글 수정
    @Override
    public void replyUpdate(Long id, ReplyRequestDto requestDto){

        Reply reply = replyRepository.findById(id).orElseThrow(() ->
                new IllegalArgumentException("해당 댓글이 존재하지 않습니다."+ id));


        reply.replyUpdate(requestDto);
        replyRepository.save(reply);
    }

    //댓글삭제
    @Override
    public void deleteReply(Long id) {

        replyRepository.deleteById(id);

    }
}
