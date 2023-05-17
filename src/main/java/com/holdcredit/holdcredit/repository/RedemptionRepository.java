package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Redemption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RedemptionRepository extends JpaRepository<Redemption, Long> {
}
