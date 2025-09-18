package com.example.backend.servicers;

import com.example.backend.entities.Employee;
import com.example.backend.entities.RegistrationRequest;
import com.example.backend.repositories.EmployeeRepository;
import com.example.backend.repositories.RegistrationRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private RegistrationRequestRepository requestRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private MailService mailService;

    @Autowired
    private PasswordEncoder passwordEncoder; // Inject the bean

    public List<RegistrationRequest> getAllRequests() {
        return requestRepository.findAll();
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Transactional
    public void approveRequest(Long requestId) {
        RegistrationRequest request = requestRepository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found with id: " + requestId));

        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setUsername(request.getUsername());
        employee.setEmail(request.getEmail());
        employee.setPassword(passwordEncoder.encode(request.getPassword())); // Hash the password

        employeeRepository.save(employee);
        mailService.sendApprovalEmail(request.getEmail(), request.getName());
        requestRepository.delete(request);
    }

    @Transactional
    public void rejectRequest(Long requestId) {
        if (!requestRepository.existsById(requestId)) {
            throw new RuntimeException("Request not found with id: " + requestId);
        }
        requestRepository.deleteById(requestId);
    }
}