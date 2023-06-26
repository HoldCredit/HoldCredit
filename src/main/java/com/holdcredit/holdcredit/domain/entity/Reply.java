package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyRequestDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="REPLY_SEQ", initialValue = 1, allocationSize = 1, name ="REPLY_SEQ_GENERATOR")
public class Reply extends Date {

    //댓글 번호
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REPLY_SEQ_GENERATOR")
    @Column(name = "reply_no")
    private Long id;

    //QNA 번호
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qna_no", nullable = false, updatable = false)
    private Qna qna;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    @JsonIgnore
    private Customer customer;

    @Column
    @JsonIgnore
    private String writer;
    //내용
    @Column(length = 5000, nullable = false)
    private String reply;

    //작성일
    @CreatedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date createDate;

    //수정일
    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date lastModifiedDate;





    public ReplyResponseDto responseDto() {
        ReplyResponseDto responseDto = new ReplyResponseDto();

        responseDto.setId(this.getId());
        responseDto.setQnaNo(this.getQna().getId());
        responseDto.setCustomerNo(this.getCustomer().getId());
        responseDto.setWriter(this.getWriter());
        responseDto.setReply(this.getReply());
        responseDto.setCreateDate(this.getCreateDate());
        responseDto.setLasModifiedDate(this.getLastModifiedDate());

        return responseDto;
    }

    public void replyUpdate(ReplyRequestDto requestDto){
        this.reply = requestDto.getReply();
    }
}
