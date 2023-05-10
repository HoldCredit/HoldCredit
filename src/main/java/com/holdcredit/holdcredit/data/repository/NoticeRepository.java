package com.holdcredit.holdcredit.data.repository;

import com.holdcredit.holdcredit.data.entity.CustomerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<CustomerEntity, Long> {
}
