package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Redemption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RepaymentRepository extends JpaRepository<Redemption, Long> {
}
