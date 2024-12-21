package com.backend.flyquest.Service.ServiceImp;

import com.backend.flyquest.Exception.DeletionTimeRunoutException;
import com.backend.flyquest.Model.Ticket;
import com.backend.flyquest.Repository.CustomRepository.TicketCustomRepository;
import com.backend.flyquest.Repository.TicketRepository;
import com.backend.flyquest.Service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketServiceImp implements TicketService {
    @Autowired
    private TicketCustomRepository ticketCustomRepository;
    @Autowired
    private TicketRepository ticketRepository;

    @Override
    public void deleteReservation(String ticketID) throws DeletionTimeRunoutException {
        ticketCustomRepository.deleteReservationAndUpdateSeat(ticketID);
    }

    @Override
    public void makeReservation(Ticket ticket) {
        ticketCustomRepository.makeReservationAndUpdateSeat(ticket);
    }

    @Override
    public List<Ticket> getTicketsByAccountID(String id) {
        return ticketRepository.findAllByAccountId(id);
    }
}