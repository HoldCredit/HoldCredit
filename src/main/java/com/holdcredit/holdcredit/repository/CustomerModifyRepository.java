package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerModifyRepository extends JpaRepository<Customer, Long> {


}
