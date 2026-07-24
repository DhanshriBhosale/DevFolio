package com.devfolio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devfolio.backend.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

}