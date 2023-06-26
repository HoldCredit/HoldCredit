package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.entity.AnonymousData;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.AnonymousDataService;
import com.holdcredit.holdcredit.service.ScoreService;
import com.holdcredit.holdcredit.service.impl.AnonymousDataServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class pyController {

    private final AnonymousDataService anonymousDataService;
    private final CustomerRepository customerRepository;
    private final ScoreRepository scoreRepository;

    @GetMapping("/ext/{id}")
    public ResponseEntity<?> executePython(@PathVariable Long id) throws IOException, InterruptedException {

        System.out.println("id = " + id);

        AnonymousData findData = anonymousDataService.findById(id);
        Customer customer = customerRepository.findById(id).orElseThrow((() -> new IllegalArgumentException("존재하지 않는 회원입니다.")));
        Score score = scoreRepository.findByCustomer(customer);

        List<String> dataList = new ArrayList<>();
        dataList.add("python");
        dataList.add("../HoldCredit/py/ExtractingOutput.py");

        Field[] fields = findData.getClass().getDeclaredFields();
        for (Field field : fields) {
            if (field.getName().equals("id")) {
                continue;
            }
            field.setAccessible(true);
            try {
                Object fieldValue = field.get(findData);
                String fieldValueStr = null;
                if (fieldValue instanceof String) {
                    fieldValueStr = (String) fieldValue;
                } else {
                    fieldValueStr = String.valueOf(fieldValue);
                }
                dataList.add(fieldValueStr);
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            }
        }

        ProcessBuilder pb = new ProcessBuilder(dataList);
        Process process = pb.start();
        int exitCode = process.waitFor();

        if (exitCode != 0) {
            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String errorLine;
            while ((errorLine = errorReader.readLine()) != null) {
                System.err.println(errorLine);  // 오류 메시지를 출력합니다.
            }
        } else {
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"));
            String line;
            List<String> results = new ArrayList<>();
            while ((line = br.readLine()) != null) {
                results.add(line);
            }
            int cbScore = Integer.parseInt(results.get(0));
            int overdueCnt = Integer.parseInt(results.get(1));
            anonymousDataService.extractDataSave(id, cbScore, overdueCnt);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}


