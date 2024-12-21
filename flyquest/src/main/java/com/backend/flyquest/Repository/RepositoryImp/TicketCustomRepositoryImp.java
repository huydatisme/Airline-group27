package com.backend.flyquest.Repository.RepositoryImp;

import com.backend.flyquest.DTO.TicketDeletionDTO;
import com.backend.flyquest.Exception.DeletionTimeRunoutException;
import com.backend.flyquest.Model.Ticket;
import com.backend.flyquest.Repository.CustomRepository.TicketCustomRepository;
import jakarta.persistence.EntityManager;
import lombok.AllArgsConstructor;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.NativeQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.object.SqlQuery;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.TimeUnit;

@Repository
public class TicketCustomRepositoryImp implements TicketCustomRepository {

    @Autowired
    private EntityManager em;

    @Transactional
    @Override
    public void makeReservationAndUpdateSeat(Ticket ticket) {
        String seatType = "availableeconomyseat";

        switch (ticket.getSeatType()) {
            case 1 -> seatType = "availablebusinessseat";
            case 2 -> seatType = "availablefirstclassseat";
        }

        String sql = "(SELECT " + seatType + " FROM flight WHERE flightid = :flightID)";
        if ((Integer) em.createNativeQuery(sql, Integer.class).setParameter("flightID", ticket.getFlightId()).getSingleResult() > 0) {
            String updateSql = "UPDATE flight\n" +
                    "    SET " + seatType + " = " + seatType + " - 1\n" +
                    "    WHERE flightid = :FlightIDToUpdate; \n" +
                    "INSERT INTO tickethistory (flightid, accountid, datebooked, ticketstate, seattype, ticketid)\n" +
                    " VALUES ( :FlightIDToInsert, :AccountID, :DateBooked, :TicketState, :SeatType, :TicketID);";
            em.createNativeQuery(updateSql)
                    .setParameter("FlightIDToUpdate", ticket.getFlightId())
                    .setParameter("FlightIDToInsert", ticket.getFlightId())
                    .setParameter("AccountID", ticket.getAccountId())
                    .setParameter("DateBooked", ticket.getDateBooked())
                    .setParameter("TicketState", ticket.getState())
                    .setParameter("SeatType", ticket.getSeatType())
                    .setParameter("TicketID", ticket.getTicketId())
                    .executeUpdate();
        }
        else {
            throw new RuntimeException("No more seats available");
        }
    }

    @Override
    public void deleteReservationAndUpdateSeat(String Ticketid) throws DeletionTimeRunoutException {
        String seatType = "availableeconomyseat";
        System.out.println(Ticketid);
        String sql = "SELECT f.departuretime, tkh.seattype, f.flightid " +
                "FROM tickethistory tkh " +
                "JOIN flight f " +
                "ON tkh.flightid = f.flightid " +
                "WHERE tkh.ticketid = :ticketID";
        TicketDeletionDTO ticketDeletionDTO = (TicketDeletionDTO) em.createNativeQuery(sql, TicketDeletionDTO.class).setParameter("ticketID", Ticketid).getSingleResult();
        System.out.println(ticketDeletionDTO.toString());
        switch (ticketDeletionDTO.getSeattype()) {
            case 1 -> seatType = "availablebusinessseat";
            case 2 -> seatType = "availablefirstclassseat";
        }

        java.sql.Timestamp dateRightNow = Timestamp.from(
                ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC"))
                        .toInstant());
        long diffInMS = ticketDeletionDTO.getDeparturetime().getTime() - dateRightNow.getTime();
        if (diffInMS > 604800000) {
            sql = "UPDATE flight\n" +
                    "    SET " + seatType + " = " + seatType + " + 1\n" +
                    "    WHERE flightid = :FlightIDToUpdate; \n" +
                    "DELETE FROM tickethistory WHERE ticketid = :ticketID;";
            em.createNativeQuery(sql).setParameter("FlightIDToUpdate", ticketDeletionDTO.getFlightid())
                    .setParameter("ticketID", Ticketid).executeUpdate();
        } else {
            throw new DeletionTimeRunoutException("Overtime");
        }
        
    }
}