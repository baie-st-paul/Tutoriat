package com.example.tutoriat.DTO.authentication;

public record RegisterRequest (
    String firstName,
    String lastName,
    String email,
    String password
) {}
