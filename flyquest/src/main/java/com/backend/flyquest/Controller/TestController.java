package com.backend.flyquest.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/admin_test")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<?> testAdmin() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user_test")
    @PreAuthorize("hasAuthority('ROLE_USER')")
    public ResponseEntity<?> testUser() {
        return ResponseEntity.ok().build();
    }
}
