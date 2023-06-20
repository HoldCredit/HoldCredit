package com.holdcredit.holdcredit.controller;
import com.holdcredit.holdcredit.domain.dto.creditCardDto.AnonymousDataDTO;
import com.holdcredit.holdcredit.service.AnonymousDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import org.springframework.http.HttpHeaders;
@RestController
@RequestMapping("/api/creditInfo")
public class AnonymousDataController {
    private final AnonymousDataService anonymousDataService;

    @Autowired
    public AnonymousDataController(AnonymousDataService anonymousDataService) {
        this.anonymousDataService = anonymousDataService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnonymousDataDTO> getAnonymousData(@PathVariable Long id) {
        AnonymousDataDTO anonymousData = anonymousDataService.getAnonymousDataByCustomerId(id);
        if (anonymousData == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(anonymousData, HttpStatus.OK);
    }


}
