package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository  extends JpaRepository<Customer, Long>{

    /*JpaRepository를 사용하게 되면 @JPA어노테이션을 사용하지 않아도 된다!
  또한, 이것을 사용하면
  기본적인 CRUD를 제공하기 때문에 따로 코드를 작성하지 않아도 된다!
 */

    Optional<Customer> findByEmail(String email);
    boolean existsByEmail(String email);

}
