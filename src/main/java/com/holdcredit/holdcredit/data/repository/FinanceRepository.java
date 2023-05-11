package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.FinanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRepository  extends JpaRepository<FinanceEntity, Long> {
}
