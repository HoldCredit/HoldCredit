package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
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
@SequenceGenerator(sequenceName ="NOTICE_SEQ", initialValue = 1, allocationSize = 1, name ="NOTICE_SEQ_GENERATOR")
public class Notice extends Date {

    @Id //공지사항 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="NOTICE_SEQ_GENERATOR")
    @Column(name = "notice_no")
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
    @Column(length = 500, nullable = false)
    private String content;

    //조회수
    @Column(nullable = false)
    private Long hits;

    //첨부파일 구분
    @Builder.Default
    private Classification attachClassification = Classification.NO;

    //첨부파일과 연관관계 설정
    @Builder.Default
    @OneToMany(mappedBy = "notice", cascade = CascadeType.REMOVE)
    private List<Attach> attach = new ArrayList<>();

    // 공지사항에서 첨부파일이 YES인 경우에만  첨부파일 테이블에  db가 저장되도록



}
