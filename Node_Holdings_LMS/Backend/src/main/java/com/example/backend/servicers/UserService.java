package com.example.backend.servicers;

import com.example.backend.entities.Employee;
import com.example.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Employee getUserDetails(String username) {
        return employeeRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public void updateUsername(String oldUsername, String newUsername) {
        Employee employee = employeeRepository.findByUsername(oldUsername)
                .orElseThrow(() -> new RuntimeException("User not found"));
        employee.setUsername(newUsername);
        employeeRepository.save(employee);
    }

    @Transactional
    public void updatePassword(String username, String newPassword) {
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        employee.setPassword(passwordEncoder.encode(newPassword));
        employeeRepository.save(employee);
    }
}
