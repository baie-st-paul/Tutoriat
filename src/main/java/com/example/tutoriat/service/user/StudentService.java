package com.example.tutoriat.service.user;

import com.example.tutoriat.models.user.Student;
import com.example.tutoriat.repository.user.StudentRepository;
import org.springframework.stereotype.Service;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserService userService;

    public StudentService(StudentRepository studentRepository, UserService userService) {
        this.studentRepository = studentRepository;
        this.userService = userService;
    }

    public void save(Student student) {
        if(userService.existsByEmail(student.getEmail())) throw new IllegalArgumentException("Email already exists");

        studentRepository.save(student);
    }
}

