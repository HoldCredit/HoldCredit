package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtRepository extends JpaRepository<Debt, Long> {
}
