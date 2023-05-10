package com.holdcredit.holdcredit.data.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class DateEntity {
    /**
     * 공통으로 날짜 쓸때 해당 클래스 import 받아서 쓰세용 뿌잉뿌잉 >,<)/
     * application.java 에서 @EnableJpaAuditing 작성 <- 등록, 수정을 자동으로 처리해주는 AuditorAware 스프링 빈 등록
     * 해당 추상클래스 @EntityListeners(AuditingEntityListener.class)를 작성
     * @CreateDate, 생성일
     * @LastModifiedDate 수정일
     * @Temporal(TemporalType.TIMESTAMP) : 자동으로 일자 값을 생성할 수 있습니다.
     */

    @CreatedDate
    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate; //작성일

    @LastModifiedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastModifiedDate; //수정일
}
