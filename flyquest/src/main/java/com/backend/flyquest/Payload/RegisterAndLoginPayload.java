package com.backend.flyquest.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.userdetails.UserDetails;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class RegisterAndLoginPayload {
    private UserDetails userDetails;
    private String jwtToken;
}