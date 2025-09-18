package com.example.backend.controllers;

import com.example.backend.entities.Employee;
import com.example.backend.entities.RegistrationRequest;
import com.example.backend.servicers.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/requests")
    public List<RegistrationRequest> getRequests() {
        return adminService.getAllRequests();
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return adminService.getAllEmployees();
    }

    @PostMapping("/requests/approve/{id}")
    public ResponseEntity<String> approveRequest(@PathVariable Long id) {
        adminService.approveRequest(id);
        return ResponseEntity.ok("Request approved successfully.");
    }

    @DeleteMapping("/requests/reject/{id}")
    public ResponseEntity<String> rejectRequest(@PathVariable Long id) {
        adminService.rejectRequest(id);
        return ResponseEntity.ok("Request rejected successfully.");
    }
}