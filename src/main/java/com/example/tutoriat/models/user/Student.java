package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "students")
@PrimaryKeyJoinColumn(name = "email")
public class Student extends User {
    public Student(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
    }
}
