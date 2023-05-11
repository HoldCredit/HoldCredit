package com.holdcredit.holdcredit.data.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

    @Entity
    @Getter
    @Builder
    @Table(name="Reply")
    @SequenceGenerator(name = "REPLY_SEQ_GENERATOR",sequenceName ="REPLY_SEQ", allocationSize = 1)
    public class ReplyEntity extends DateEntity{
        //댓글 번호
        @Id
        @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REPLY_SEQ_GENERATOR")
        private Long reply_no;

        //QNA 번호
        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "question_no", nullable = false, updatable = false)
        private QnaEntity qnaEntity;

        //작성자
        @Column(length = 200, nullable = false)
        private String writer;

        //내용
        @Column(length = 5000, nullable = false)
        private String reply;

        //대댓글?


}
