package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
    private Long id;
    private String name;
    @ManyToOne
    private Teacher teacher;

    public TeachingSubject(String name) {
        this.name = name;
    }
}
