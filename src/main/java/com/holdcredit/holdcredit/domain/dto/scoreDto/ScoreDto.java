package com.holdcredit.holdcredit.domain.dto.scoreDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import com.holdcredit.holdcredit.domain.entity.Debt;
import com.holdcredit.holdcredit.domain.entity.Score;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ScoreDto {
    private Long id;
    private Long customerNo;
    private Integer loanScore;
    private Integer paybackScore;
    private Integer transactionScore;
    private Integer creditTypeScore;
    private Integer nonFinancialScore;
    private LocalDateTime evaluationDate;
    private Integer cbScore;
}
