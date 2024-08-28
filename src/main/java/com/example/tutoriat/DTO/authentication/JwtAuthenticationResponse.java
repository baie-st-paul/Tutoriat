package com.example.tutoriat.DTO.authentication;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private String firstName;
    private String lastName;
    private String email;
    private String token;
}
