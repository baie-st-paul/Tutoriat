package com.example.tutoriat.models.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class TeachingSubject {
    @Id
    private Long id;
    private String name;


    public TeachingSubject(String name) {
        this.name = name;
    }
}
