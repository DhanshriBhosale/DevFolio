package com.devfolio.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devfolio.backend.entity.About;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {

    Optional<About> findTopByOrderByIdAsc();

}