package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "teachers")
@PrimaryKeyJoinColumn(name = "email")
public class Teacher extends User {

    @OneToMany(mappedBy = "teacher")
    private Set<TeachingSubject> subjects;

    public Teacher(String email, String password, String firstName, String lastName, UserType userType) {
        super(email, password, firstName, lastName, userType);
    }

}
