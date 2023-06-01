package com.holdcredit.holdcredit.controller;

import com.holdcredit.holdcredit.domain.entity.Attach;
import com.holdcredit.holdcredit.repository.AttachRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.io.IOException;
import org.springframework.http.HttpHeaders;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequiredArgsConstructor
public class AttachController {
    private final AttachRepository attachRepository;

    @GetMapping("/attachments/{id}")
    public ResponseEntity<FileSystemResource> downloadAttachment(@PathVariable Long id, @RequestParam("path") String path) throws IOException {
        // Attach 테이블에서 해당 ID의 첨부 파일 정보를 가져옴
        Attach attachment = attachRepository.findById(id).orElse(null);

        if (attachment == null) {
            // 첨부 파일이 존재하지 않을 경우 404 에러 응답
            return ResponseEntity.notFound().build();
        }

        // 파일 경로 설정
        String filePath = attachment.getPath();

        // 파일을 로드하여 Resource 객체로 변환
        FileSystemResource resource = new FileSystemResource(filePath);

        // 파일 다운로드를 위한 Content-Disposition 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + attachment.getOriginFileName());

        // 클라이언트로 응답 전송
        return ResponseEntity.ok()
                .headers(headers)
                .body(resource);
    }

}