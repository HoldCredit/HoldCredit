package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Repayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepaymentRepository extends JpaRepository<Repayment, Long> {
}
