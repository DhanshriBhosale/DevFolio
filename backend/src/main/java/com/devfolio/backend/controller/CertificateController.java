package com.devfolio.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devfolio.backend.entity.Certificate;
import com.devfolio.backend.repository.CertificateRepository;

@RestController
@RequestMapping("/api/certificates")
@CrossOrigin(origins = "http://localhost:5173")
public class CertificateController {

    @Autowired
    private CertificateRepository certificateRepository;

    @GetMapping
    public List<Certificate> getAllCertificates() {
        return certificateRepository.findAll();
    }

    @PostMapping
    public Certificate addCertificate(@RequestBody Certificate certificate) {
        return certificateRepository.save(certificate);
    }

    @DeleteMapping("/{id}")
    public void deleteCertificate(@PathVariable Long id) {
        certificateRepository.deleteById(id);
    }

    @PutMapping("/{id}")
public Certificate updateCertificate(
        @PathVariable Long id,
        @RequestBody Certificate certificate) {

    Certificate existing =
            certificateRepository.findById(id).orElseThrow();

    existing.setTitle(certificate.getTitle());
    existing.setIssuer(certificate.getIssuer());
    existing.setYear(certificate.getYear());
    existing.setCertificateLink(certificate.getCertificateLink());

    return certificateRepository.save(existing);
}

}