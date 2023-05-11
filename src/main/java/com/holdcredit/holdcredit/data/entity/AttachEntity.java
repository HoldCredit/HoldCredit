package com.holdcredit.holdcredit.data.entity;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Table(name="Attach")
@SequenceGenerator(name = "ATTACH_SEQ_GENERATOR",sequenceName ="ATTACH_SEQ", allocationSize = 1)
public class AttachEntity {
    //file 번호
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ATTACH_SEQ_GENERATOR")
    private Long attach_no;

    //공지사항 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_no", nullable = false, updatable = false)
    private NoticeEntity noticeEntity;

    //원본파일 이름
    @Column(length = 500, nullable = false)
    private String origin_file_name;

    //저장파일 이름
    @Column(length = 500, nullable = false)
    private String stored_file_name;

    //경로
    @Column(length = 500, nullable = false)
    private String path;

    //확장자
    @Column(length = 500, nullable = false)
    private String ext;

    //삭제 구분 (y,n)
    @Column(length = 1, nullable = false)
    private String delete_attach = "n";

    //


}
