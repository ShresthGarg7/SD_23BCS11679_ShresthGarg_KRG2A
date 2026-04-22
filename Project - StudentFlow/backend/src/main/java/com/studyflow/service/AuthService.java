package com.studyflow.service;

import com.studyflow.dto.AuthResponse;
import com.studyflow.dto.LoginRequest;
import com.studyflow.dto.RegisterRequest;
import com.studyflow.model.User;
import com.studyflow.repository.UserRepository;
import com.studyflow.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(new HashSet<>(Collections.singletonList("ROLE_USER")))
                .build();

        userRepository.save(user);
        
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );
        
        var jwtToken = jwtService.generateToken(userDetails);
        return AuthResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        
        var userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList()
        );

        var jwtToken = jwtService.generateToken(userDetails);
        return AuthResponse.builder()
                .token(jwtToken)
                .name(user.getName())
                .email(user.getEmail())
                .build();
    }
}
