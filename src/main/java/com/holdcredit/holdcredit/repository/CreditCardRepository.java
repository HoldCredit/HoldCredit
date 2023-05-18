package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.CreditCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreditCardRepository extends JpaRepository<CreditCard, Long> {
}
