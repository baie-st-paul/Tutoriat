package com.example.tutoriat.models.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "teaching_subjects")
public class TeachingSubject {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name="teacher_email", nullable=false)
    private Teacher teacher;

    public TeachingSubject(String name, Teacher teacher) {
        this.name = name;
        this.teacher = teacher;
    }
}
