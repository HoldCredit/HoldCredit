package com.holdcredit.holdcredit.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Date;

@Getter //setter: 기능 변경 시 복잡 -> 생성자를 통해 db 삽입
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 자동생성
@Entity //jpa
@Table(name="FAQ")
@SequenceGenerator(sequenceName ="FAQ_SEQ", initialValue = 1, allocationSize = 1, name ="FAQ_SEQ")    //G_generator = S_name
public class FaqEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="FAQ_SEQ") //시퀀스
    private Long faq_no;

    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", nullable = false, updatable = false) //readonly
//    @JsonIgnore //response에 해당 필드 제외

    private CustomerEntity customerEntity; //userNo
    @Column(length = 500, nullable = false )
    private String title;

    @Column(length = 5000, nullable = false)
    private String content;


    @Builder
    public FaqEntity(CustomerEntity customerEntity, String title, String content){
        this.customerEntity = customerEntity;
        this.title = title;
        this.content = content;
    }

    /* 게시글 수정 */
    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }



}
