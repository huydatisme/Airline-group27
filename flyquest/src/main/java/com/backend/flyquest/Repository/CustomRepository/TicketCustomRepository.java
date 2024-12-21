package com.backend.flyquest.Repository.CustomRepository;

import com.backend.flyquest.Exception.DeletionTimeRunoutException;
import com.backend.flyquest.Model.Ticket;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface TicketCustomRepository {
    @Transactional
    public void makeReservationAndUpdateSeat(Ticket ticket);
    @Transactional
    public void deleteReservationAndUpdateSeat(String ticketId) throws DeletionTimeRunoutException;
}