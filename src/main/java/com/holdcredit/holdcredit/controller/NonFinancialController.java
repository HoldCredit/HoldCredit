package com.holdcredit.holdcredit.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/nonFinancial")
@RequiredArgsConstructor
public class NonFinancialController {

    // 비금융 정보 등록
    @PostMapping
    /*public ResponseEntity<BoardInfoDto> postBoard(@RequestBody @Valid postBoardDto dto) {
        BoardInfoDto boardInfoDto = boardService.postBoard(dto);
        return new ResponseEntity<>(boardInfoDto, OK);
    }*/
}
