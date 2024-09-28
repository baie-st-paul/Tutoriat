package com.example.tutoriat.service.user;

import com.example.tutoriat.models.user.Teacher;
import com.example.tutoriat.repository.user.TeacherRepository;
import org.springframework.stereotype.Service;

@Service
public class TeacherService {
    private final TeacherRepository teacherRepository;
    private final UserService userService;

    public TeacherService(TeacherRepository teacherRepository, UserService userService) {
        this.teacherRepository = teacherRepository;
        this.userService = userService;
    }

    public void save(Teacher teacher) {
        if(userService.existsByEmail(teacher.getEmail())) throw new IllegalArgumentException("Email already exists");
        teacherRepository.save(teacher);
    }
}
