package com.holdcredit.holdcredit.service;

import com.holdcredit.holdcredit.domain.dto.scoreDto.ScoreDto;
import com.holdcredit.holdcredit.domain.entity.Score;

public interface ScoreService {
    ScoreDto read(Long id);


    Integer getCbScore(Long customerNo);
}
