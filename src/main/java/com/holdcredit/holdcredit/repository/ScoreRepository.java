package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScoreRepository  extends JpaRepository<Score, Long> {
    Score findByCustomer(Customer customer);

    Optional<Score> findByCustomer_Id(Long customerNo);
}
