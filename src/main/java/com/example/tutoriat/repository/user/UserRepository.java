package com.example.tutoriat.repository.user;

import com.example.tutoriat.models.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Transactional
    User findByEmail(String email);

    boolean existsByEmail(String email);
}
