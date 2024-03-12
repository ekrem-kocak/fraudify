package com.fraudify.ws.user.service;

import com.fraudify.ws.user.model.User;
import com.fraudify.ws.user.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public User createUser(@RequestBody User user) {
        String encoded = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encoded);
        return this.userRepository.save(user);
    }
}
