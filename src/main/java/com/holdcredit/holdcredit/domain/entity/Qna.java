package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="QNA_SEQ", initialValue = 1, allocationSize = 1, name ="QNA_SEQ_GENERATOR")
public class Qna extends Date {

    @Id //QNA 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="QNA_SEQ_GENERATOR")
    @Column(name = "question_no")
    private Long id;

    //회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private Customer customer;

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
    private Long hits;

    @Builder.Default
    @OneToMany(mappedBy = "qna", cascade = CascadeType.REMOVE)
    private List<Reply> reply = new ArrayList<>();




}

