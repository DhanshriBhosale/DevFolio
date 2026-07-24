package com.devfolio.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devfolio.backend.entity.Education;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {

}