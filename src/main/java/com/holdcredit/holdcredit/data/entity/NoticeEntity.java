package com.holdcredit.holdcredit.data.entity;

import lombok.Builder;
import lombok.Getter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name="Notice")
@SequenceGenerator(name = "NOTICE_SEQ_GENERATOR",sequenceName ="NOTICE_SEQ", allocationSize = 1)
public class NoticeEntity {
    //공지사항 번호
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="NOTICE_SEQ_GENERATOR")
    private Long notice_no;

    //회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", nullable = false, updatable = false)
    private CustomerEntity customerEntity;

    //제목
    @Column(length = 500, nullable = false )
    private String title;

    //내용
    @Column(length = 5000, nullable = false)
    private String content;

    //조회수
    @Column(nullable = false)
    private Long hits = 0L;

    //첨부파일 구분 (y,n)
    @Column(length = 1, nullable = false)
    private String attach;

}
