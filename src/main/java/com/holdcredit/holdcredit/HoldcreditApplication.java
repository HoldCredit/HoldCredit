package com.holdcredit.holdcredit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class HoldcreditApplication {

	public static void main(String[] args) {
		SpringApplication.run(HoldcreditApplication.class, args);
	}

}
