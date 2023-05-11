package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="REPLY_SEQ", initialValue = 1, allocationSize = 1, name ="REPLY_SEQ_GENERATOR")
public class Reply extends Date {

    @Id //댓글 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REPLY_SEQ_GENERATOR")
    @Column(name = "reply_no")
    private Long id;

    //QNA 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_no", nullable = false, updatable = false)
    private Qna qna;

    //작성자
    @Column(length = 200, nullable = false)
    private String writer;

    //내용
    @Column(length = 5000, nullable = false)
    private String reply;

    //대댓글?


}
