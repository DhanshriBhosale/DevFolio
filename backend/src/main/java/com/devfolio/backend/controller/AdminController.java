package com.devfolio.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devfolio.backend.entity.Admin;
import com.devfolio.backend.repository.AdminRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;


    // Admin Register
    @PostMapping("/register")
    public Admin register(@RequestBody Admin admin) {
        return adminRepository.save(admin);
    }


    // Admin Login
   @PostMapping("/login")
public String login(@RequestBody Admin admin) {

    System.out.println("===== LOGIN REQUEST =====");
    System.out.println("Username: " + admin.getUsername());
    System.out.println("Password: " + admin.getPassword());

    Optional<Admin> existingAdmin =
            adminRepository.findByUsername(admin.getUsername());

    System.out.println("Admin Found: " + existingAdmin.isPresent());

    if (existingAdmin.isPresent()
            && existingAdmin.get().getPassword().equals(admin.getPassword())) {

        System.out.println("LOGIN SUCCESS");
        return "Login Successful";
    }

    System.out.println("LOGIN FAILED");
    return "Invalid Username or Password";
}
}