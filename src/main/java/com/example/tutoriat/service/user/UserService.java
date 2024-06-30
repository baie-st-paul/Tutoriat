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

    public void save(User user) {
        if (userRepository.existsByEmail(user.getEmail())) throw new IllegalArgumentException("Email already exists");
        userRepository.save(user);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
