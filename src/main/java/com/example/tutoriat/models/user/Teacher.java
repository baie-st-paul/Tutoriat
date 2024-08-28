package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import lombok.*;

import java.util.Collection;
import java.util.Set;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Teacher extends User {
    private Set<String> subjects;

    public Teacher(String email, String password, String firstName, String lastName, Collection<String> subjects) {
        super(email, password, firstName, lastName);
        this.subjects = Set.copyOf(subjects);
    }


}
