package com.example.tutoriat.models.user;

import lombok.Getter;

@Getter
public enum UserType {
    STUDENT(1),
    TEACHER(2);

    private final byte value;

    UserType(int value) {
        this.value = (byte) value;
    }

    public static UserType fromValue(byte value) {
        for (UserType userType : values()) {
            if (userType.getValue() == value) {
                return userType;
            }
        }
        return null;
    }
}
