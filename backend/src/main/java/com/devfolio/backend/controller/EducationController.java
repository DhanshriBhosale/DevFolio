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

import com.devfolio.backend.entity.Education;
import com.devfolio.backend.repository.EducationRepository;

@RestController
@RequestMapping("/api/education")
@CrossOrigin(origins = "http://localhost:5173")
public class EducationController {

    @Autowired
    private EducationRepository educationRepository;

    @GetMapping
    public List<Education> getAllEducation() {
        return educationRepository.findAll();
    }

    @PostMapping
    public Education addEducation(@RequestBody Education education) {
        return educationRepository.save(education);
    }

    @DeleteMapping("/{id}")
    public void deleteEducation(@PathVariable Long id) {
        educationRepository.deleteById(id);
    }


    @PutMapping("/{id}")
public Education updateEducation(@PathVariable Long id,
                                 @RequestBody Education education) {

    Education existing = educationRepository.findById(id).orElseThrow();

    existing.setDegree(education.getDegree());
    existing.setCollege(education.getCollege());
    existing.setYear(education.getYear());
    existing.setCgpa(education.getCgpa());

    return educationRepository.save(existing);
}

}