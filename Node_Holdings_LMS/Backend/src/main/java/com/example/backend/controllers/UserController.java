package com.example.backend.controllers;


import com.example.backend.entities.Employee;
import com.example.backend.servicers.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/details")
    public ResponseEntity<Employee> getUserDetails(Principal principal) {
        // Principal ensures users can only get their own details
        Employee employee = userService.getUserDetails(principal.getName());
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/update/username")
    public ResponseEntity<String> updateUsername(Principal principal, @RequestBody Map<String, String> payload) {
        String newUsername = payload.get("newUsername");
        if (newUsername == null || newUsername.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("New username cannot be empty.");
        }
        userService.updateUsername(principal.getName(), newUsername);
        return ResponseEntity.ok("Username updated successfully. Please log in again with your new username.");
    }

    @PutMapping("/update/password")
    public ResponseEntity<String> updatePassword(Principal principal, @RequestBody Map<String, String> payload) {
        String newPassword = payload.get("newPassword");
        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("New password cannot be empty.");
        }
        userService.updatePassword(principal.getName(), newPassword);
        return ResponseEntity.ok("Password updated successfully.");
    }
}