package com.example.tutoriat.DTO.user;

import com.example.tutoriat.models.user.Teacher;
import com.example.tutoriat.models.user.TeachingSubject;

import java.util.Set;
import java.util.stream.Collectors;

public record TeacherSimpleDTO(
        String firstName,
        String lastName,
        Set<String> subjects
) {

    public static TeacherSimpleDTO fromUser(Teacher teacher) {
        return new TeacherSimpleDTO(
                teacher.getFirstName(),
                teacher.getLastName(),
                teacher.getSubjects().stream().map(TeachingSubject::getName).collect(Collectors.toSet())
        );
    }
}
