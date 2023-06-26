package com.holdcredit.holdcredit.domain.dto.customerDto;

import com.holdcredit.holdcredit.domain.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerResponseDto {
    public String email;

    public static CustomerResponseDto of(Customer customer) {
        return new CustomerResponseDto(customer.getEmail());
    }
}
