package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.entity.AnonymousData;
import com.holdcredit.holdcredit.domain.entity.Score;
import org.springframework.stereotype.Service;

@Service
public interface AnonymousDataService {

    AnonymousData findById(Long id);

    void extractDataSave(Long id, Integer cbScore);



}
