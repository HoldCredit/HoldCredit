package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.CreditCardEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCardEntity, Long> {
}
