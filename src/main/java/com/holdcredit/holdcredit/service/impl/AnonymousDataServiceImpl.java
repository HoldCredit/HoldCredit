package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.creditCardDto.AnonymousDataDTO;
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
    public void extractDataSave(Long id, Integer cbScore, Integer overdueCnt) {
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
        Score score = scoreRepository.findByCustomer(customer);

        if(score == null){
            score = new Score();
            score.setCustomer(customer);
            score.setCbScore(cbScore);
            score.setOverdueCnt(overdueCnt);
            scoreRepository.save(score);
        } else {
            score.setCbScore(cbScore);
            score.setOverdueCnt(overdueCnt);
        }
    }

    @Override
    public AnonymousDataDTO getAnonymousDataByCustomerId(Long id) {
        AnonymousData anonymousData = anonymousDataRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("회원 금융 정보를 찾을 수 없습니다."));

        // Convert AnonymousData entity to AnonymousDataDTO
        AnonymousDataDTO anonymousDataDTO = new AnonymousDataDTO();
        anonymousDataDTO.setCustomerNo(anonymousData.getId());
        anonymousDataDTO.setAddYn(anonymousData.getADD_YN());
        anonymousDataDTO.setAdNo(anonymousData.getAD_NO());
        anonymousDataDTO.setRes_Add(anonymousData.getRES_ADD());
        anonymousDataDTO.setPRE_LMT(anonymousData.getPRE_LMT());
        anonymousDataDTO.setPre_RT(anonymousData.getPRE_RT());
        anonymousDataDTO.setL00000001(anonymousData.getL00000001());
        anonymousDataDTO.setL00000002(anonymousData.getL00000002());
        anonymousDataDTO.setPS0001897(anonymousData.getPS0001897());
        return anonymousDataDTO;
        //이 구현은 AnonymousData 저장소에서 엔터티를 검색하고 새 AnonymousDataDTO 개체를 만들고 엔터티의 해당 값을 DTO 개체로 설정합니다. 마지막으로 DTO 개체를 반환합니다.
    }



    @Scheduled(cron = "0 0 4 * * *") // 매시간마다 실행 (0s 0m 4h)
    public void checkAndInsert() throws IOException, InterruptedException {
        List<Customer> cutomerList = customerRepository.findAll();

        for (Customer customer : cutomerList) {
            if (customer.getScore() == null) {
                List newScore = runPythonScriptExtractCB(customer.getId());
                Score score = new Score();
                score.setCbScore((Integer) newScore.get(0));
                score.setOverdueCnt(((Integer) newScore.get(1)));
                score.setCustomer(customer);
                scoreRepository.save(score);
            } else {
                List<Score> customerScoreList = scoreRepository.findAll();
                for (Score score : customerScoreList) {
                    List newScore = runPythonScriptExtractCB(customer.getId());
                    score.setCbScore((Integer) newScore.get(0));
                    score.setOverdueCnt((Integer) newScore.get(1));
                }
            }
        }
    }

    private List<Integer> runPythonScriptExtractCB(Long customerId) throws IOException, InterruptedException {

        Customer customer = customerRepository.findById(customerId).orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));
        AnonymousData findData = anonymousDataRepository.findById(customer.getId()).orElseThrow(() -> new IllegalArgumentException("입력된 금융 정보가 없습니다."));

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
            List<Integer> newScore = new ArrayList<>();
            newScore.add(Integer.parseInt(results.get(0)));
            newScore.add(Integer.parseInt(results.get(1)));
            return newScore;
        }
        return null;
    }


}
