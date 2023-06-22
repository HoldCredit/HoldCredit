package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.entity.AnonymousData;
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

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class pyController {

    private final AnonymousDataService anonymousDataService;

    @GetMapping("/ext/{customerNo}")
    public ResponseEntity<?> executePython(@PathVariable("customerNo") Long id) throws IOException, InterruptedException {

        AnonymousData findData = anonymousDataService.findById(id);

        List<String> dataList = new ArrayList<>();
        dataList.add("python");
        dataList.add("../HoldCredit/py/ExtractingOutput.py");

        Field[] fields = findData.getClass().getDeclaredFields();
        for (Field field : fields) {
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
            BufferedReader br = new BufferedReader(new InputStreamReader(process.getInputStream(),"UTF-8"));
            String result = br.readLine();
            log.info("result : {}", result);

            int cbScore = Integer.parseInt(result);
            anonymousDataService.extractDataSave(id, cbScore);
        }


        return new ResponseEntity<>(HttpStatus.OK);
    }
}


