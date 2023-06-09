package com.holdcredit.holdcredit.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaRequestDto;
import com.holdcredit.holdcredit.domain.dto.boardDto.QnaResponseDto;
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
@SequenceGenerator(sequenceName ="QNA_SEQ", initialValue = 1, allocationSize = 1, name ="QNA_SEQ_GENERATOR")
public class Qna extends Date {

    @Id //QNA 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="QNA_SEQ_GENERATOR")
    @Column(name = "qna_no")
    private Long id;

    //회원번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_no", updatable = false)
    @JsonIgnore
    private Customer customer;

    @Column
    @JsonIgnore
    private String writer;

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




    public static Qna toEntity(QnaRequestDto dto){
        Qna qna = new Qna();

        qna.setId(dto.getId());
        qna.setTitle(dto.getTitle());
        qna.setWriter(dto.getWriter());
        qna.setContent(dto.getContent());
        qna.setPwd(dto.getPwd());
        qna.setHits(dto.getHits());
        qna.setCreateDate(dto.getCreateDate());
        qna.setLastModifiedDate(dto.getLasModifiedDate());
        return qna;

    }

    public void updateQna(QnaRequestDto requestDto){
        this.title = requestDto.getTitle();
        this.content = requestDto.getContent();
        this.pwd = requestDto.getPwd();
        this.lastModifiedDate = requestDto.getLasModifiedDate();
    }
    public QnaResponseDto responseDto(){
        return QnaResponseDto.builder()
                .id(this.getId())
                .customerNo(this.getCustomer().getId())
                .writer(this.getWriter())
                .title(this.getTitle())
                .content(this.getContent())
                .hits(this.getHits())
                .pwd(this.getPwd())
                .createDate(this.getCreateDate())
                .lastModifiedDate(this.getLastModifiedDate())
                .build();
    }
    public void countHits(int hits) {
        this.hits = hits;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        customer.getQnas().add(this);
    }
}

