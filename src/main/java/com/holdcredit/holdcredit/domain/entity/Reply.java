package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyRequestDto;
import com.holdcredit.holdcredit.domain.dto.replyDto.ReplyResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;

@Entity
@Getter
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

    //작성자 = Customer 테이블에서 가져올예정

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
    //대댓글?

    public ReplyResponseDto responseDto() {
        ReplyResponseDto responseDto = new ReplyResponseDto();

        responseDto.setId(this.getId());
        responseDto.setQnaNo(this.getQna().getId());
        responseDto.setReply(this.getReply());
        responseDto.setCreateDate(this.getCreateDate());
        responseDto.setLasModifiedDate(this.getLastModifiedDate());

        return responseDto;
    }

    public void replyUpdate(ReplyRequestDto requestDto){
        this.reply = requestDto.getReply();
    }
}
