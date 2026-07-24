package com.devfolio.backend.controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devfolio.backend.entity.Contact;
import com.devfolio.backend.repository.ContactRepository;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping
    public java.util.List<Contact> getContact() {

        return contactRepository
                .findTopByOrderByIdAsc()
                .map(Collections::singletonList)
                .orElse(Collections.emptyList());

    }

    @PostMapping
    public Contact saveContact(@RequestBody Contact contact) {

        return contactRepository
                .findTopByOrderByIdAsc()
                .map(existing -> {

                    existing.setEmail(contact.getEmail());
                    existing.setPhone(contact.getPhone());
                    existing.setAddress(contact.getAddress());
                    existing.setLinkedin(contact.getLinkedin());
                    existing.setGithub(contact.getGithub());
                    existing.setPortfolio(contact.getPortfolio());

                    return contactRepository.save(existing);

                })
                .orElseGet(() -> contactRepository.save(contact));

    }

    @PutMapping("/{id}")
public Contact updateContact(
        @PathVariable Long id,
        @RequestBody Contact contact) {

    Contact existing = contactRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Contact not found"));

    existing.setEmail(contact.getEmail());
    existing.setPhone(contact.getPhone());
    existing.setAddress(contact.getAddress());
    existing.setLinkedin(contact.getLinkedin());
    existing.setGithub(contact.getGithub());
    existing.setPortfolio(contact.getPortfolio());

    return contactRepository.save(existing);
}

}