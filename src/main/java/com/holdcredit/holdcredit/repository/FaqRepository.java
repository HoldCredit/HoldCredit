package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository <Faq, Long> {


}
