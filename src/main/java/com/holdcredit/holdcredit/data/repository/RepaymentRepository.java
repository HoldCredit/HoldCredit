package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.RepaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepaymentRepository extends JpaRepository<RepaymentEntity, Long> {
}
