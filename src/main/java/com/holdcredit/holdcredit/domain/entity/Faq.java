package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.domain.entity.enumeration.Date;
import lombok.*;

import javax.persistence.*;

@Getter //setter: 기능 변경 시 복잡 -> 생성자를 통해 db 삽입
@NoArgsConstructor(access = AccessLevel.PROTECTED) //접근 제어로 설정하여 무분별한 객체의 생성을 막음 //기본생성자 생성
@Entity
@SequenceGenerator(sequenceName ="FAQ_SEQ", initialValue = 1, allocationSize = 1, name ="FAQ_SEQ_GENERATOR")    //G_generator = S_name
public class Faq extends Date {

    @Id //faq 번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator ="FAQ_SEQ_GENERATOR") //시퀀스
    @Column(name = "faq_no")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY) //Lazy:지연로딩 ///cascade = CascadeType.MERGE, targetEntity = Member.class
    @JoinColumn (name = "customer_no", nullable = false, updatable = false) //readonly
//    @JsonIgnore //response에 해당 필드 제외
    private Customer customer; //userNo

    //작성자
    @Column (length=200, nullable = false)
    private String writer;

    @Column(length = 500, nullable = false )
    private String title;

    @Column(length = 5000, nullable = false)
    private String content;

    @Builder
    public Faq(Customer customerEntity, String title, String content){
        this.customer = customerEntity;
        this.title = title;
        this.content = content;
    }

    /* 게시글 수정 */
    public void update(String title, String content){
        this.title = title;
        this.content = content;
    }



}
