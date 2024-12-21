package com.backend.flyquest.Service;


import com.backend.flyquest.Model.Account;
import com.backend.flyquest.Payload.RegisterRequest;
import org.springframework.stereotype.Service;

@Service
public interface AccountService {
    /**
     if the username is taken, this function will return 1.
     if the email is taken, this function will return 2.
     if account saved succesfully, return 0;
     **/
    Account saveAccountToDatabase(RegisterRequest registerRequest);
    Account findAccountByUsername(String username);
    Account findAccountByEmail(String email);
}