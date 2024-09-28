package com.example.tutoriat.DTO.authentication;

public record LoginRequest (
    String email,
    String password
){}
