package com.backend.flyquest.Security;

import com.backend.flyquest.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class AccountDetails implements UserDetails {

    private final Account account;
    private List<GrantedAuthority> authorities;

    public AccountDetails(Account account) {
        this.account = account;
        this.authorities = new ArrayList<GrantedAuthority>();
      authorities.add(new SimpleGrantedAuthority("ROLE_" + account.getAccountRole()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return account.getAccountPassword();
    }

    @Override
    public String getUsername() {
        return account.getAccountName();
    }
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public Account getAccount() {
        return account;
    }
}
