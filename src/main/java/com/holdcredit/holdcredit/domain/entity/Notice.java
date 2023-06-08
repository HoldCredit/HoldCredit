package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.NoticeResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
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

    //작성자
    @Column
    @JsonIgnore
    private String writer;

    //내용
    @Column(length = 500, nullable = false)
    private String content;

    //비밀번호
    @Column
    private String pwd;

    //조회수
    @Column(columnDefinition = "NUMBER(19,0) DEFAULT 0", nullable = false)
    private int hits;


    //첨부파일 구분
    @Column(columnDefinition = "NUMBER(19,0) DEFAULT 0")
    private int fileAttached; // 1파일있음 0파일없음

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date createDate; //작성일

    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date lastModifiedDate; //수정일

    //첨부파일과 연관관계 설정
    @Builder.Default
    @OneToMany(mappedBy = "notice", cascade = CascadeType.REMOVE)
    private List<Attach> attach = new ArrayList<>();

    public static Notice toEntity(NoticeRequestDto dto) {

        Notice notice = new Notice();

        notice.setId(dto.getId());
        notice.setTitle(dto.getTitle());
        notice.setWriter(dto.getWriter());
        notice.setContent(dto.getContent());
        notice.setPwd(dto.getPwd());
        notice.setHits(dto.getHits());
        notice.setCreateDate(dto.getCreateDate());
        notice.setLastModifiedDate(dto.getLasModifiedDate());
        notice.setFileAttached(0);
        return notice;
    }

    public static Notice toSaveAttach(NoticeRequestDto dto) {
        Notice notice = new Notice();

        notice.setId(dto.getId());
        notice.setWriter(dto.getWriter());
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        notice.setPwd(dto.getPwd());
        notice.setHits(dto.getHits());
        notice.setCreateDate(dto.getCreateDate());
        notice.setLastModifiedDate(dto.getLasModifiedDate());
        notice.setFileAttached(1);
        return notice;
    }

    public void updateNotice(NoticeRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.pwd = requestDto.getPwd();
        this.lastModifiedDate = requestDto.getLasModifiedDate();
    }

    public static NoticeResponseDto responseDto(Notice notice) {
        NoticeResponseDto responseDto = new NoticeResponseDto();

        responseDto.setId(notice.getId());
        responseDto.setWriter(notice.getWriter());
        responseDto.setTitle(notice.getTitle());
        responseDto.setContent(notice.getContent());
        responseDto.setPwd(notice.getPwd());
        responseDto.setHits(notice.getHits());
        responseDto.setCreateDate(notice.getCreateDate());
        responseDto.setLastModifiedDate(notice.getLastModifiedDate());
        responseDto.setAttach(notice.getAttach());

        return responseDto;
    }

    public void countHits(int hits) {
        this.hits = hits;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        customer.getNotices().add(this);
    }

}
