package com.holdcredit.holdcredit.domain.entity;

import com.holdcredit.holdcredit.repository.NoticeRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import static org.assertj.core.api.Assertions.*;


@SpringBootTest
@Transactional
class NoticeTest {

    @Autowired
    EntityManager em;
    @Autowired
    NoticeRepository noticeRepository;

    @Test
    public void findCustomerName() throws Exception {
        Notice findNotice = noticeRepository.findById(5L).get();

        assertThat(findNotice.getCustomer().getCustomerName()).isEqualTo("추경현");
    }


}