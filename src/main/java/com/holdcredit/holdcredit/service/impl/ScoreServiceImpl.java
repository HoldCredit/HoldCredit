package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.scoreDto.ScoreDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ScoreServiceImpl implements ScoreService {
    private final ScoreRepository scoreRepository;


    @Override
    public ScoreDto read(Long id){
        Optional<Score> optionalScore = scoreRepository.findById(id);
        if (optionalScore.isPresent()) {
            Score score = optionalScore.get();
            ScoreDto scoreDto = score.toDto(score);
            scoreDto.setCustomerNo(score.getCustomer().getId());
            return scoreDto;
        } else {
            return null;
        }
    }

    @Override
    public Integer getCbScore(Long customerNo) {
        Optional<Score> optionalScore = scoreRepository.findByCustomer_Id(customerNo);
        if (optionalScore.isPresent()) {
            Score score = optionalScore.get();
            return score.getCbScore();
        }
        return null;
    }



}
