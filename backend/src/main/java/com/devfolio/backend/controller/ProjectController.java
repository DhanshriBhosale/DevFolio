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

import com.devfolio.backend.entity.Project;
import com.devfolio.backend.repository.ProjectRepository;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;


    // Get all projects
    @GetMapping
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }


    // Add new project
    @PostMapping
    public Project addProject(@RequestBody Project project) {
        return projectRepository.save(project);
    }


    // Get project by id
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectRepository.findById(id)
                .orElse(null);
    }


    // Delete project
    @DeleteMapping("/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "Project deleted successfully";
    }

    @PutMapping("/{id}")
public Project updateProject(@PathVariable Long id,
                             @RequestBody Project project) {

    Project existing = projectRepository.findById(id)
            .orElseThrow();

    existing.setTitle(project.getTitle());
    existing.setDescription(project.getDescription());
    existing.setTechStack(project.getTechStack());
    existing.setGithubLink(project.getGithubLink());
    existing.setImage(project.getImage());

    return projectRepository.save(existing);
}
}