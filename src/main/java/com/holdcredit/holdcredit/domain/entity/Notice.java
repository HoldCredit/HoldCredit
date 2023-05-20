package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.NoticeDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(sequenceName ="NOTICE_SEQ", initialValue = 1, allocationSize = 1, name ="NOTICE_SEQ_GENERATOR")
public class Notice extends Date{

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="NOTICE_SEQ_GENERATOR")
    @Column(name="notice_no")
    private Long id;

    //회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", /*nullable = false,*/ updatable = false)
    private Customer customer;

    //제목
    @Column(length = 500, nullable = false )
    private String title;

    //내용
    @Column(length = 500, nullable = false)
    private String content;

    //조회수
    @Column(insertable = false)
    private Long hits;

    @Column
    private String pwd;
    //첨부파일 구분
    @Builder.Default
    @Enumerated(EnumType.STRING)
    private Classification attachClassification = Classification.NO;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date createDate; //작성일

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date lastModifiedDate; //수정일

    //첨부파일과 연관관계 설정
    @Builder.Default
    @OneToMany(mappedBy = "notice", cascade = CascadeType.REMOVE)
    private List<Attach> attach = new ArrayList<>();

    // 공지사항에서 첨부파일이 YES인 경우에만  첨부파일 테이블에  db가 저장되도록

    public void updateNotice(NoticeRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.pwd = requestDto.getPwd();
        this.lastModifiedDate = requestDto.getLasModifiedDate();
    }

    public NoticeResponseDto responseDto(){
        return NoticeResponseDto.builder()
                .id(this.getId())
                .title(this.getTitle())
                .customer_name(this.getCustomer())
                .content(this.getContent())
                .pwd(this.getPwd())
                .hits(this.getHits())
                .createDate(this.getCreateDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .attach(this.getAttach())
                .build();
    }



}
