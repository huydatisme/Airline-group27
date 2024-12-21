package com.backend.flyquest.Controller;

import java.util.HashMap;
import java.util.Map;

import com.backend.flyquest.Security.AccountDetailService;
import com.backend.flyquest.Security.JwtRequest;
import com.backend.flyquest.Security.JwtTokenUtil;
import com.backend.flyquest.Payload.RegisterAndLoginPayload;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class JwtController {
    @Autowired
    private AccountDetailService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private AccountDetailService accountDetailService;

    @PostMapping("/authentication")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        try {
            authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

            final UserDetails userDetails = accountDetailService
                    .loadUserByUsername(authenticationRequest.getUsername());

            final String token = jwtTokenUtil.generateToken(userDetails);
            return ResponseEntity.ok(new RegisterAndLoginPayload(userDetails, token));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("1", e);
        } catch (BadCredentialsException e) {
            throw new Exception("2", e);
        }
    }
}