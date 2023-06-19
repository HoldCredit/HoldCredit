package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Faq;
import com.holdcredit.holdcredit.domain.entity.Qna;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository <Faq, Long> {

    Page<Faq> findByContentContaining(String keyword, Pageable pageable);

    Page<Faq> findByTitleContaining(String keyword, Pageable pageable);

}
