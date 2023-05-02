package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.FaqEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FaqRepository extends JpaRepository <FaqEntity, Long> {


}
