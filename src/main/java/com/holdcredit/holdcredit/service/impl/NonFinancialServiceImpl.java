package com.holdcredit.holdcredit.service.impl;

import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialRequestDto;
import com.holdcredit.holdcredit.domain.dto.nonFinancialDto.NonFinancialResponseDto;
import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.NonFinancial;
import com.holdcredit.holdcredit.domain.entity.Score;
import com.holdcredit.holdcredit.domain.entity.enumeration.Classification;
import com.holdcredit.holdcredit.repository.CustomerRepository;
import com.holdcredit.holdcredit.repository.NonFinancialRepository;
import com.holdcredit.holdcredit.repository.ScoreRepository;
import com.holdcredit.holdcredit.service.NonFinancialService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class NonFinancialServiceImpl implements NonFinancialService {
    private final NonFinancialRepository nonFinancialRepository;
    private final ScoreRepository scoreRepository;
    private final CustomerRepository customerRepository;

    @Override
    public NonFinancial save(NonFinancialRequestDto nonFinancialRequestDto){
        Customer customer = customerRepository.findById(nonFinancialRequestDto.getCustomerNo())
                .orElseThrow(() -> new IllegalArgumentException("회원번호를 찾을 수 없습니다"));
        NonFinancial nonFinancial = nonFinancialRequestDto.toEntity();
        nonFinancial.setCustomer(customer);

        /* 비금융 점수 (일단 계산식에서 결혼여부, 자녀수 뺌)*/
        Integer nonFinancialScore = totalNonFinancialScore(nonFinancial.getRealestate(),nonFinancial.getVehicle(),nonFinancial.getHealthInsurance(),nonFinancial.getPhoneBillPayment(),nonFinancial.getProofOfIncomeAmount(),nonFinancial.getNationalPension());

        Score score = scoreRepository.findByCustomer(customer)
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        score.setNonFinancialScore(nonFinancialScore);
        score.setCustomer(nonFinancial.getCustomer());
        scoreRepository.save(score);

        return nonFinancialRepository.save(nonFinancial);
    }

    private Integer totalNonFinancialScore(Classification realestate,Classification vehicle,Classification healthInsurance,Classification phoneBillPayment,Classification proofOfIncomeAmount, Classification nationalPension) {
        int nonFinancialScore = 0;
        //주택 소유
        if (realestate == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        //자동차 소유
        if (vehicle == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        //건강보험 납부
        if (healthInsurance == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        //통신요금 납부
        if (phoneBillPayment == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        //소득금액 납부
        if (proofOfIncomeAmount == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        //국민연금 납부
        if (nationalPension == Classification.YES) {
            nonFinancialScore += 2;
        } else nonFinancialScore += 0;

        return nonFinancialScore;
    }

    @Override
    public NonFinancialResponseDto read(Long id){
        Optional<NonFinancial> optionalNonFinancial = nonFinancialRepository.findById(id);
        if (optionalNonFinancial.isPresent()){
            NonFinancial nonFinancial = optionalNonFinancial.get();
            NonFinancialResponseDto nonFinancialResponseDto = nonFinancial.toDto(nonFinancial); //먉
            nonFinancialResponseDto.setCustomerNo(nonFinancial.getCustomer().getId()); //먉
            return  nonFinancialResponseDto;
        }else {
            return null;
        }
    }

    @Override
    public void delete(Long id){
        Optional<NonFinancial> optionalNonFinancial = nonFinancialRepository.findById(id);
        if (optionalNonFinancial.isPresent()){
            NonFinancial nonFinancial = optionalNonFinancial.get();
            Customer customer = nonFinancial.getCustomer();

            // 비금융 정보 초기화
            NonFinancialRequestDto nonFinancialRequestDto = NonFinancialRequestDto.builder()
                    .marital(Classification.NO)
                    .childrenCnt(0L)
                    .realestate(Classification.NO)
                    .vehicle(Classification.NO)
                    .healthInsurance(Classification.NO)
                    .phoneBillPayment(Classification.NO)
                    .proofOfIncomeAmount(Classification.NO)
                    .nationalPension(Classification.NO)
                    .build();
            nonFinancial.updateNonFinancial(nonFinancialRequestDto);
            nonFinancialRepository.save(nonFinancial);

            //Score의  nonFinancialScore 초기화
            Score score = scoreRepository.findByCustomer(customer)
                    .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));
            Integer nonFinancialScore = totalNonFinancialScore(nonFinancial.getRealestate(), nonFinancial.getVehicle(), nonFinancial.getHealthInsurance(), nonFinancial.getPhoneBillPayment(), nonFinancial.getProofOfIncomeAmount(), nonFinancial.getNationalPension());
            score.setNonFinancialScore(nonFinancialScore); //초기화 값의 계산식 다시 수행
            scoreRepository.save(score);
        }else {
            throw new IllegalArgumentException("해당 ID의 비금융 정보를 찾을 수 없습니다.");
        }
    }

    @Override
    public void update(Long id, NonFinancialRequestDto nonFinancialRequestDto){
//        NonFinancial nonFinancial = nonFinancialRepository.findById(id).get();
        NonFinancial nonFinancial = nonFinancialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 비금융 정보를 찾을 수 없습니다"));

        // 비금융 정보 업데이트
        nonFinancial.updateNonFinancial(nonFinancialRequestDto);
        nonFinancialRepository.save(nonFinancial);

        // Score 엔티티에서 비금융 점수 업데이트
        Score score = scoreRepository.findByCustomer(nonFinancial.getCustomer())
                .orElseThrow(() -> new IllegalArgumentException("해당 고객의 점수를 찾을 수 없습니다"));

        Integer nonFinancialScore = totalNonFinancialScore(nonFinancial.getRealestate(), nonFinancial.getVehicle(), nonFinancial.getHealthInsurance(), nonFinancial.getPhoneBillPayment(), nonFinancial.getProofOfIncomeAmount(), nonFinancial.getNationalPension());

        score.setNonFinancialScore(nonFinancialScore);
        nonFinancialRepository.save(nonFinancial);
    }




}
