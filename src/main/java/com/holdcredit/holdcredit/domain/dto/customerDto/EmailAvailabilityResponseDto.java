package com.holdcredit.holdcredit.domain.dto.customerDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailAvailabilityResponseDto {
    private String email;
    private boolean available;

}
