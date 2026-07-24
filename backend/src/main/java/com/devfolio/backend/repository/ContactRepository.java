package com.devfolio.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.devfolio.backend.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

    Optional<Contact> findTopByOrderByIdAsc();

}