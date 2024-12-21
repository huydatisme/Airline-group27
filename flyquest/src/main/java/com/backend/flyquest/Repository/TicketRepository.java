package com.backend.flyquest.Repository;

import com.backend.flyquest.Model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, String> {
    public List<Ticket> findAllByAccountId(String id);
}
