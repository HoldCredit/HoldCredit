package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Notice;
import com.holdcredit.holdcredit.domain.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface QnaRepository extends JpaRepository<Qna, Long> {

    Page<Qna> findByContentContaining(String keyword, Pageable pageable);

}
