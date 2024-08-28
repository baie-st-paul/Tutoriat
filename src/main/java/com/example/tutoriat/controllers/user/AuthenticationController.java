package com.example.tutoriat.controllers.user;

import com.example.tutoriat.DTO.authentication.JwtAuthenticationResponse;
import com.example.tutoriat.DTO.authentication.LoginRequest;
import com.example.tutoriat.DTO.authentication.RegisterRequest;
import com.example.tutoriat.service.security.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping(value = "/registerTeacher")
    public ResponseEntity<JwtAuthenticationResponse> registerTeacher(
            @Valid @RequestBody RegisterRequest request,
            @RequestParam(value = "subjects") Collection<String> subjects
    ) {
        try {
            return ResponseEntity.ok(authenticationService.registerTeacher(request, subjects));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/registerStudent")
    public ResponseEntity<JwtAuthenticationResponse> registerStudent(
            @Valid @RequestBody RegisterRequest request
    ) {
        try {
            return ResponseEntity.ok(authenticationService.registerStudent(request));
        }
        catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtAuthenticationResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            return ResponseEntity.ok(authenticationService.login(request));
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/exists/{email}")
    public ResponseEntity<Boolean> existsByEmail(@PathVariable String email) {
        try {
            boolean exist = authenticationService.existsByEmail(email);
            if (exist) return ResponseEntity.ok(true);
            return ResponseEntity.notFound().build();
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}
