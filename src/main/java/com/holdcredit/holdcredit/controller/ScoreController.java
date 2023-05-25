package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.scoreDto.ScoreDto;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.service.ScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/score")
public class ScoreController {
    private final ScoreService scoreService;

    @GetMapping("/{id}")
    public ResponseEntity<ScoreDto> read(@PathVariable Long id){
        ScoreDto scoreDto = scoreService.read(id);
        if (scoreDto != null) {
            return new ResponseEntity<>(scoreDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
