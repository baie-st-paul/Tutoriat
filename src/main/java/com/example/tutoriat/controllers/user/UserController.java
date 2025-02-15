package com.example.tutoriat.controllers.user;

import com.example.tutoriat.DTO.user.TeacherSimpleDTO;
import com.example.tutoriat.service.user.TeacherService;
import com.example.tutoriat.service.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final TeacherService teacherService;

    @PreAuthorize("authenticated")
    @GetMapping("/getusertype/{email}")
    public String getUserType(@PathVariable String email) {
        try {
            return userService.getUserType(email);
        }
        catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }

    @PreAuthorize("authenticated")
    @GetMapping("/getallteachers")
    public Set<TeacherSimpleDTO> getTeachers() {
        return teacherService.getTeachers();
    }
}
