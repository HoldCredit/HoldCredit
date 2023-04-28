package com.holdcredit.holdcredit.entity;

import com.holdcredit.holdcredit.repository.TestRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
@Rollback(false)
class testEntityTest {

    @PersistenceContext
    EntityManager em;

    @Autowired
    TestRepository testRepository;

    @Test
    public void saveEntity() throws Exception {
        // given
        TestEntity testEntity = new TestEntity();
        testEntity.setName("test");
        TestEntity saveEntity = testRepository.save(testEntity);

        //when
        TestEntity findEntity = testRepository.findById(saveEntity.getId()).get();

        //then
        assertThat(findEntity.getId()).isEqualTo(testEntity.getId());
        assertThat(findEntity.getName()).isEqualTo(testEntity.getName());
        assertThat(findEntity).isEqualTo(testEntity);

     }
}