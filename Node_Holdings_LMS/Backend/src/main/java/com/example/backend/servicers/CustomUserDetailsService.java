package com.example.backend.servicers;

import com.example.backend.entities.Employee;
import com.example.backend.repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // This service is now only responsible for finding employees.
        // If it can't find one, it throws an exception, and Spring Security
        // will automatically try the next authentication provider (the in-memory one).
        Employee employee = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new User(
                employee.getUsername(),
                employee.getPassword(),
                AuthorityUtils.createAuthorityList("ROLE_USER")
        );
    }
}