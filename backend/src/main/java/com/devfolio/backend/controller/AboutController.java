package com.devfolio.backend.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devfolio.backend.entity.About;
import com.devfolio.backend.repository.AboutRepository;

@RestController
@RequestMapping("/api/about")
@CrossOrigin(origins = "http://localhost:5173")
public class AboutController {

    @Autowired
    private AboutRepository aboutRepository;

    // Get About Details
    @GetMapping
    public List<About> getAbout() {

        return aboutRepository
                .findTopByOrderByIdAsc()
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());
    }

    // Add About (Only First Time)
    @PostMapping
    public About saveAbout(@RequestBody About about) {

        return aboutRepository
                .findTopByOrderByIdAsc()
                .map(existing -> {

                    existing.setName(about.getName());
                    existing.setProfession(about.getProfession());
                    existing.setEmail(about.getEmail());
                    existing.setPhone(about.getPhone());
                    existing.setLocation(about.getLocation());
                    existing.setBio(about.getBio());

                    return aboutRepository.save(existing);

                })
                .orElseGet(() -> aboutRepository.save(about));
    }

    // Update About
    @PutMapping("/{id}")
    public About updateAbout(
            @PathVariable Long id,
            @RequestBody About about) {

        About existing = aboutRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("About not found"));

        existing.setName(about.getName());
        existing.setProfession(about.getProfession());
        existing.setEmail(about.getEmail());
        existing.setPhone(about.getPhone());
        existing.setLocation(about.getLocation());
        existing.setBio(about.getBio());

        return aboutRepository.save(existing);
    }
}