package com.backend.flyquest.Model;

import com.backend.flyquest.Payload.RegisterRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "account")
@NoArgsConstructor
public class Account {
    @Id
    @Column(name = "account_id")
    private String accountId;
    @Column(name = "account_name")
    private String accountName;
    @Column(name = "account_password")
    private String accountPassword;
    @Column(name = "account_email")
    private String accountEmail;
    @Column(name = "account_role")
    private String accountRole;

    public Account(
            String account_name
            , String account_password
            , String account_email
            , String account_role
    ) {
        this.accountId = UUID.randomUUID().toString().replace("-", "");
        this.accountName = account_name;
        this.accountPassword = new BCryptPasswordEncoder().encode(account_password);
        this.accountEmail = account_email;
        this.accountRole = account_role;
    }

    public Account(RegisterRequest registerRequest) {
        this.accountId = UUID.randomUUID().toString().replace("-", "");
        this.accountName = registerRequest.getAccountName();
        this.accountPassword = new BCryptPasswordEncoder().encode(registerRequest.getPassword());
        this.accountEmail = registerRequest.getEmail();
        this.accountRole = "USER";
    }
}
