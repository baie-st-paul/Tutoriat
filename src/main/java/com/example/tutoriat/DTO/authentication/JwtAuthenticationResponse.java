package com.example.tutoriat.DTO.authentication;

public record JwtAuthenticationResponse (
    String firstName,
    String lastName,
    String email,
    String userType,
    String token
){}
