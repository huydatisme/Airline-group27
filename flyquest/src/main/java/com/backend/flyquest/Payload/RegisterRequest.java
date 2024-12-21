package com.backend.flyquest.Payload;

import lombok.Data;

@Data
public class RegisterRequest {
    private String accountName;
    private String password;
    private String email;

    public RegisterRequest(){};
    public RegisterRequest(String email, String name, String password, String role) {
        this.email = email;
        this.password = password;
        this.accountName = name;
    }
}