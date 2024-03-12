package com.fraudify.ws.user.service;

import com.fraudify.ws.user.model.User;
import com.fraudify.ws.user.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User createUser(@RequestBody User user) {
        return this.userRepository.save(user);
    }
}
