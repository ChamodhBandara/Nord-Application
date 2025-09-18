package com.example.backend.entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "requests") // Table name as per original request
@Data
public class RegistrationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String username;
    private String password; // Storing plain text temporarily until approved
    private String email;
}