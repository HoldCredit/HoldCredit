package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CustomerModifyRepository extends JpaRepository<Customer, Long> {
  /*  @Modifying
    @Query("DELETE FROM Customer c WHERE c.id = :customerId AND c.password = :password")
    void deleteByIdAndPassword(@Param("customerId") Long customerId, @Param("password") String password);
*/
    @Query("UPDATE Customer c SET c.password = :password WHERE c.id = :customer_no")
    @Modifying
    void pwdUpdate(@Param("customer_no") Long id, @Param("password") String password);

/*
  @Query("UPDATE Customer c SET c.password = :password WHERE c.id = :id")
  void pwdUpdate(@Param("id") Long id, @Param("password") String password);
*/

}
