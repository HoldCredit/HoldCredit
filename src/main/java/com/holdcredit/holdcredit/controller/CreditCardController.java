package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardRequestDto;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.CreditCardResponseDto;
import com.holdcredit.holdcredit.domain.entity.CreditCard;
import com.holdcredit.holdcredit.service.CreditCardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CREATED;


@RestController
@RequiredArgsConstructor
@RequestMapping("/creditCard")
public class CreditCardController {
    private final CreditCardService creditCardService;

    /* 등록 */
    @PostMapping("/save")
    public ResponseEntity<?> save (@RequestBody CreditCardRequestDto creditCardRequestDto){
        // 회원 번호 확인
        Long customerNo = creditCardRequestDto.getCustomerNo();
        System.out.println("전달된 회원 번호: " + customerNo);

        creditCardService.save(creditCardRequestDto);
        return new ResponseEntity<>(CREATED);
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

    /* 삭제 */
    @PutMapping("/delete/{id}")
    public  ResponseEntity<CreditCard> delete(@PathVariable Long id){
        creditCardService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /* 수정 */
    @PutMapping("/update/{id}")
    public ResponseEntity<CreditCardRequestDto> update(@PathVariable Long id, @RequestBody @Validated CreditCardRequestDto creditCardRequestDto){
        creditCardService.update(id,creditCardRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
