package com.backend.flyquest.Controller;


import com.backend.flyquest.Model.Account;
import com.backend.flyquest.Payload.RegisterRequest;
import com.backend.flyquest.Security.AccountDetailService;
import com.backend.flyquest.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    @Autowired
    private AccountService accountService;
    @PostMapping("/register")
    public ResponseEntity<?> registerNewAccount(@RequestBody RegisterRequest registerRequest) {
        try {
            Account account = accountService.saveAccountToDatabase(registerRequest);
            return ResponseEntity.ok(account);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Account Creation Failure for some reason...");
        }
    }
}