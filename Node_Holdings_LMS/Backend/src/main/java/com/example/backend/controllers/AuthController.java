package com.example.backend.controllers;



import com.example.backend.entities.RegistrationRequest;
import com.example.backend.repositories.RegistrationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private RegistrationRequestRepository requestRepository;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegistrationRequest registrationRequest) {
        // Basic validation can be added here
        requestRepository.save(registrationRequest);
        return ResponseEntity.ok("Registration request submitted successfully. Awaiting admin approval.");
    }

    // This endpoint is used by the frontend to verify a successful login.
    // Spring Security's HttpBasic handles the actual authentication.
    @GetMapping("/login/success")
    public ResponseEntity<Map<String, Object>> loginSuccess(Principal principal) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("username", principal.getName());
        response.put("roles", authentication.getAuthorities());
        return ResponseEntity.ok(response);
    }
}
