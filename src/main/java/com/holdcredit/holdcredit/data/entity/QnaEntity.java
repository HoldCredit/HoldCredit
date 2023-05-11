package com.holdcredit.holdcredit.data.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@Table(name="QnA")
@SequenceGenerator(name = "QNA_SEQ_GENERATOR",sequenceName ="QNA_SEQ", allocationSize = 1)
public class QnaEntity extends DateEntity{
    //QNA 번호
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="QNA_SEQ_GENERATOR")
    private Long question_no;

    //회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private CustomerEntity customerEntity;

    //작성자
    @Column (length=200, nullable = false)
    private String writer;

    //제목
    @Column(length = 500, nullable = false )
    private String title;

    //내용
    @Column(length = 5000, nullable = false)
    private String content;

    //조회수
    @Column(nullable = false)
    private Long hits = 0L;

    @OneToMany(mappedBy = "qnaEntity", cascade = CascadeType.REMOVE)
    private List<ReplyEntity> replyEntity = new ArrayList<>();




}

