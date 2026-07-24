package com.devfolio.backend.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class ImageUploadController {

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file)
            throws IOException {

        File folder = new File(UPLOAD_DIR);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String filename = System.currentTimeMillis()
                + "_"
                + file.getOriginalFilename();

        Path uploadPath = Path.of(UPLOAD_DIR, filename);

        Files.copy(file.getInputStream(), uploadPath);

        return ResponseEntity.ok(
                "http://localhost:8080/uploads/" + filename
        );
    }
}