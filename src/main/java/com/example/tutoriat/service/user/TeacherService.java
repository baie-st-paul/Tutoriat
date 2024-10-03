package com.example.tutoriat.service.user;

import com.example.tutoriat.models.user.Teacher;
import com.example.tutoriat.models.user.TeachingSubject;
import com.example.tutoriat.repository.user.SubjectRepository;
import com.example.tutoriat.repository.user.TeacherRepository;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class TeacherService {

    private final TeacherRepository teacherRepository;
    private final SubjectRepository subjectRepository;
    private final UserService userService;

    public TeacherService(TeacherRepository teacherRepository, SubjectRepository subjectRepository, UserService userService) {
        this.teacherRepository = teacherRepository;
        this.subjectRepository = subjectRepository;
        this.userService = userService;
    }

    public void save(Teacher teacher, Collection<String> subjects) {
        if(userService.existsByEmail(teacher.getEmail())) throw new IllegalArgumentException("Email already exists");
        Teacher returnedTeacherValue = teacherRepository.saveAndFlush(teacher);
        subjectRepository.saveAll(subjects.stream().map(subject -> new TeachingSubject(subject, returnedTeacherValue)).collect(Collectors.toSet()));
    }
}
