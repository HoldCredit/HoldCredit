package com.holdcredit.holdcredit.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Spring MVC 에 대한 설정파일. 웹에 대한 설정 파일
@Configuration
public class WebConfig implements WebMvcConfigurer {

    // CORS 설정
    // react (http://localhost:3000) --> 8080 api 를 호출할 수 있도록 설정
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PATCH", "PUT", "OPTIONS", "DELETE")
                .allowCredentials(true);
    }
}
