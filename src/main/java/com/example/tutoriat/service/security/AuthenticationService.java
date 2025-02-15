package com.example.tutoriat.service.security;

import com.example.tutoriat.DTO.authentication.JwtAuthenticationResponse;
import com.example.tutoriat.DTO.authentication.LoginRequest;
import com.example.tutoriat.DTO.authentication.RegisterRequest;
import com.example.tutoriat.models.user.Student;
import com.example.tutoriat.models.user.Teacher;
import com.example.tutoriat.models.user.User;
import com.example.tutoriat.models.user.UserType;
import com.example.tutoriat.service.user.StudentService;
import com.example.tutoriat.service.user.TeacherService;
import com.example.tutoriat.service.user.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class AuthenticationService {
    private final UserService userService;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final TeacherService teacherService;
    private final StudentService studentService;

    public AuthenticationService(UserService userService, JwtService jwtService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder, TeacherService teacherService, StudentService studentService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.teacherService = teacherService;
        this.studentService = studentService;
    }

    public JwtAuthenticationResponse registerTeacher(RegisterRequest request, Collection<String> subjects) {
        var teacher = new Teacher(request.email(), passwordEncoder.encode(request.email()), request.firstName(), request.lastName(), UserType.TEACHER);
        teacherService.save(teacher, subjects);
        return generateAuthResponse(teacher);
    }

    public JwtAuthenticationResponse registerStudent(RegisterRequest request) {
        var student = new Student(request.email(), passwordEncoder.encode(request.email()), request.firstName(), request.lastName(), UserType.STUDENT);
        studentService.save(student);
        return generateAuthResponse(student);
    }

    private JwtAuthenticationResponse generateAuthResponse(User user) {
        var jwt = jwtService.generateToken(user);
        return new JwtAuthenticationResponse(user.getFirstName(), user.getLastName(), user.getEmail(), user.getUserType().toString(), jwt);
    }

    public JwtAuthenticationResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));
        UserDetails userDetails = userService.userDetailsService().loadUserByUsername(request.email());
        var jwt = jwtService.generateToken(userDetails);
        User user = userService.findByEmail(request.email());
        return new JwtAuthenticationResponse(user.getFirstName(), user.getLastName(), user.getEmail(), user.getUserType().toString(), jwt);
    }

    public boolean existsByEmail(String email){
        return userService.existsByEmail(email);
    }
}
