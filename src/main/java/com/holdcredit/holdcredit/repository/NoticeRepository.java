package com.holdcredit.holdcredit.repository;

import com.holdcredit.holdcredit.domain.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Page<Notice> findByContentContaining(String keyword, Pageable pageable);

    Page<Notice> findByTitleContaining(String keyword, Pageable pageable);

    Page<Notice> findByWriterContaining(String keyword, Pageable pageable);

}
