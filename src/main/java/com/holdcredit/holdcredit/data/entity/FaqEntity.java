package com.holdcredit.holdcredit.data.entity;

import lombok.*;

import javax.persistence.*;

@Getter //setter: 기능 변경 시 복잡 -> 생성자를 통해 db 삽입
@NoArgsConstructor(access = AccessLevel.PROTECTED) //기본 생성자 생성
@Entity //jpa
@Table(name="FAQ")

@SequenceGenerator(sequenceName ="fNo", initialValue = 1, allocationSize = 1, name ="FAQ_SEQ")    //G_generator = S_name
public class FaqEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="FAQ_SEQ") //시퀀스
    private Long fNo;

//    @ManyToOne(fetch = FetchType.Lazy, cascade = CascadeType.REMOVE) //Lazy:지연로딩 //cascade :유저가 지워지면 게시글도 지워짐
//    @JoinColumn ( name = "userNo")
//    private Customer customer;

    @Column(length = 500, nullable = false )
    private String title;

    @Column(length = 5000, nullable = false)
    private String content;


    @Builder
    public FaqEntity(String title, String content){
        this.title = title;
        this.content = content;
    }




}
