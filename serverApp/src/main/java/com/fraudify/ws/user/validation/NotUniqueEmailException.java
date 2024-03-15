package com.fraudify.ws.user.validation;

import com.fraudify.ws.user.model.User;
import com.fraudify.ws.user.repository.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class NotUniqueEmailException implements ConstraintValidator<UniqueEmail, String> {

    private final UserRepository userRepository;

    public NotUniqueEmailException(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        User inDb = userRepository.getUserByEmail(s);
        System.out.println(inDb);
        return inDb == null;
    }
}
