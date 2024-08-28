package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Teacher extends User {
    public Teacher(String email, String password, String firstName, String lastName) {
        super(email, password, firstName, lastName);
    }

}
