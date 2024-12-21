package com.backend.flyquest.Repository;

import com.backend.flyquest.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Account findAccountByAccountName(String username);
    Account findAccountByAccountEmail(String email);
}