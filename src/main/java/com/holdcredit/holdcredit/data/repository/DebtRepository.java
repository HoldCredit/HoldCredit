package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.DebtEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DebtRepository extends JpaRepository<DebtEntity, Long> {
}
