package com.example.tutoriat.repository.user;

import com.example.tutoriat.models.user.TeachingSubject;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubjectRepository extends JpaRepository<TeachingSubject, Long> {

}
