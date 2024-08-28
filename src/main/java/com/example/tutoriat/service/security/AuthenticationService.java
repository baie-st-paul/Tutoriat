package com.example.tutoriat.service.security;

import com.example.tutoriat.DTO.authentication.JwtAuthenticationResponse;
import com.example.tutoriat.DTO.authentication.LoginRequest;
import com.example.tutoriat.DTO.authentication.RegisterRequest;
import com.example.tutoriat.models.user.User;
import com.example.tutoriat.service.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    public AuthenticationService(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public JwtAuthenticationResponse register(RegisterRequest request) {
        var user = new User(request.getEmail(), request.getFirstName(), request.getLastName(), passwordEncoder.encode(request.getEmail()));
        userService.save(user);
        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(user.getFirstName(), user.getLastName(), user.getEmail(), jwt);
    }

    public JwtAuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(request.getEmail());
        var jwt = jwtService.generateToken(userDetails);
        User user = userService.findByEmail(request.getEmail());
        return new JwtAuthenticationResponse(user.getFirstName(), user.getLastName(), user.getEmail(), jwt);
    }

    public boolean existsByEmail(String email){
        return userService.existsByEmail(email);
    }
}
