package com.backend.flyquest.Service.ServiceImp;


import com.backend.flyquest.Model.Account;
import com.backend.flyquest.Payload.RegisterRequest;
import com.backend.flyquest.Repository.AccountRepository;
import com.backend.flyquest.Service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountServiceImp implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account saveAccountToDatabase(RegisterRequest registerRequest) {
        if (accountRepository.findAccountByAccountEmail(registerRequest.getEmail()) != null) {
            throw new RuntimeException("email is already in use");
        } else {
            Account account = new Account(registerRequest);
            accountRepository.save(account);
            return account;
        }
    }

    @Override
    public Account findAccountByUsername(String username) {
        try {
            return accountRepository.findAccountByAccountName(username);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Account findAccountByEmail(String email) {
        return accountRepository.findAccountByAccountEmail(email);
    }
}