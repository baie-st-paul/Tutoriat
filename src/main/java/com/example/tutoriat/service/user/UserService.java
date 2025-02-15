package com.example.tutoriat.service.user;

import com.example.tutoriat.repository.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import com.example.tutoriat.models.user.User;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsService userDetailsService() {
        return userRepository::findByEmail;
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public String getUserType(String email) {
        return userRepository.findByEmail(email).getUserType().name();
    }
}
