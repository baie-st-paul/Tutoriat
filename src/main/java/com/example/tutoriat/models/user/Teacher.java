package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "teachers")
@PrimaryKeyJoinColumn(name = "email")
public class Teacher extends User {
    @OneToMany(mappedBy = "teacher")
    private Set<TeachingSubject> subjects;

    public Teacher(String email, String password, String firstName, String lastName, Collection<String> subjects) {
        super(email, password, firstName, lastName);
        this.subjects = subjects.stream().map(TeachingSubject::new).collect(Collectors.toSet());
    }

}
