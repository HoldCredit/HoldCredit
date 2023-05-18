package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequiredArgsConstructor
@RequestMapping("/creditCard")
public class CreditCardController {
    private final CreditCardService creditCardService;

    /* 등록 */
    @PostMapping("/save")
    public CreditCard save (@RequestBody CreditCardRequestDto creditCardRequestDto){
        return creditCardService.save(creditCardRequestDto);
    }

    /* 읽기 */
    @GetMapping("/{id}")
    public ResponseEntity<CreditCardResponseDto> read(@PathVariable Long id){
        CreditCardResponseDto creditCardResponseDto = creditCardService.read(id);
        if (creditCardResponseDto != null){
            return new ResponseEntity<>(creditCardResponseDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
