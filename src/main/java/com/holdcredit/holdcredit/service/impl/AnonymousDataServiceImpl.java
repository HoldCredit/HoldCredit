package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.entity.AnonymousData;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.repository.AnonymousDataRepository;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.AnonymousDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AnonymousDataServiceImpl implements AnonymousDataService {
    
    private final AnonymousDataRepository anonymousDataRepository;
    private final ScoreRepository scoreRepository;
    private final CustomerRepository customerRepository;

    @Override
    public AnonymousData findById(Long id) {
        return anonymousDataRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원 금융 정보를 찾을 수 없습니다."));
    }

    @Override
    public void extractDataSave(Long id, Integer cbScore) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
        Score score = scoreRepository.findByCustomer(customer);
        if(score == null){
            score = new Score();
            score.setCustomer(customer);
        }
        score.setCbScore(cbScore);
        scoreRepository.save(score);
//        findScore.setOverdueCnt(Integer.parseInt(overdueCnt));
    }


    @Scheduled(cron = "0 0 4 * * *") // 매시간마다 실행 (0s 0m 4h)
    public void checkAndInsert() throws IOException, InterruptedException {
        List<Customer> cutomerList = customerRepository.findAll();

        for (Customer customer : cutomerList) {
            if (customer.getScore() == null) {
                Integer cbScore = runPythonScriptExtractCB(customer.getId());
                Score score = new Score();
                score.setCbScore(cbScore);
                score.setCustomer(customer);
                scoreRepository.save(score);
            }
        }
    }

    private Integer runPythonScriptExtractCB(Long customerId) throws IOException, InterruptedException {

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
        AnonymousData findData = anonymousDataRepository.findById(customer.getId()).orElseThrow(() -> new IllegalArgumentException("입력된 금융 정보가 없습니다."));

        URL resourceUrl = getClass().getClassLoader().getResource("ExtractingOutput.py");
        if (resourceUrl == null) {
            throw new IllegalArgumentException("파일을 찾을 수 없습니다.");
        }
        String filePath = resourceUrl.getPath();

        List<String> dataList = new ArrayList<>();

        dataList.add("python");
        dataList.add(filePath);

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
            return Integer.parseInt(result);
        }

        return null;
    }


}