package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Finance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FinanceRepository  extends JpaRepository<Finance, Long> {
}
