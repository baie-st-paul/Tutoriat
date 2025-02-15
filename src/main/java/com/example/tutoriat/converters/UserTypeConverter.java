package com.example.tutoriat.converters;

import com.example.tutoriat.models.user.UserType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class UserTypeConverter implements AttributeConverter<UserType, Byte> {
    @Override
    public Byte convertToDatabaseColumn(UserType attribute) {
        return attribute.getValue();
    }

    @Override
    public UserType convertToEntityAttribute(Byte dbData) {
        return UserType.fromValue(dbData);
    }
}
