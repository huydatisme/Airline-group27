package com.backend.flyquest.Security;

import com.backend.flyquest.Model.Account;
import com.backend.flyquest.Repository.AccountRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class AccountDetailService implements UserDetailsService {
    @Autowired
    private AccountRepository accountRepository;


    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        Pattern pattern = Pattern.compile("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}");
        Matcher mat = pattern.matcher(usernameOrEmail);
        Account u = null;
        if (mat.matches()) {
            u = accountRepository.findAccountByAccountEmail(usernameOrEmail);
        } else {
            u = accountRepository.findAccountByAccountName(usernameOrEmail);
        }
        if (u == null) {
            throw new UsernameNotFoundException(usernameOrEmail);
        } else {
            return new AccountDetails(u);
        }
    }

    @Transactional
    public UserDetails loadUserById(String id) {
        Account account = accountRepository.findById(id).orElseThrow(
                () -> new UsernameNotFoundException("User not found with id : " + id)
        );

        return new AccountDetails(account);
    }
}
