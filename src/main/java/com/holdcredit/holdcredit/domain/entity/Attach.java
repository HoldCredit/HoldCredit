package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
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
@SequenceGenerator(sequenceName ="ATTACH_SEQ", initialValue = 1, allocationSize = 1, name ="ATTACH_SEQ_GENERATOR")
public class Attach extends Date {

    @Id //file 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "ATTACH_SEQ_GENERATOR")
    @Column(name = "attach_no")
    private Long id;

    //공지사항 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "notice_no", nullable = false, updatable = false)
    private Notice notice;

    //원본파일 이름
    @Column(length = 500, nullable = false)
    private String originFileName;

    //저장파일 이름
    @Column(length = 500, nullable = false)
    private String storedFileName;

    //경로
    @Column(length = 500, nullable = false)
    private String path;

    //확장자
    @Column(length = 500, nullable = false)
    private String ext;

    //삭제 구분 (YES,NO)
    @Builder.Default
    @Column(length = 1, nullable = false)
    private Classification isDelete = Classification.NO;

}
