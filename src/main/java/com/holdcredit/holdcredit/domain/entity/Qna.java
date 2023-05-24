package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.dto.boardDto.QnaRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

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
    @Column(name = "qna_no")
    private Long id;

    //회원번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", updatable = false)
    private Customer customer;

    //제목
    @Column(length = 500, nullable = false )
    private String title;

    //내용
    @Column(length = 500, nullable = false)
    private String content;

    @Column
    private String pwd;

    //조회수
    @Column(columnDefinition = "NUMBER(19,0) DEFAULT 0", nullable = false)
    private int hits;

    @CreatedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date createDate; //작성일

    @LastModifiedDate
    @Temporal(TemporalType.DATE)
    private java.util.Date lastModifiedDate; //수정일

    @Builder.Default
    @OneToMany(mappedBy = "qna", cascade = CascadeType.REMOVE)
    private List<Reply> reply = new ArrayList<>();


    public void updateQna(QnaRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.pwd = requestDto.getPwd();
        this.lastModifiedDate = requestDto.getLasModifiedDate();
    }
    public QnaResponseDto responseDto(){
        return QnaResponseDto.builder()
                .id(this.getId())
                .title(this.getTitle())
                .content(this.getContent())
                .hits(this.getHits())
                .pwd(this.getPwd())
                .createDate(this.getCreateDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .reply(this.responseDto().getReply())
                .build();
    }
    public void countHits(int hits) {
        this.hits = hits;
    }

}

