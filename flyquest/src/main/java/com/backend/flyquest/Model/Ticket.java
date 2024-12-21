package com.backend.flyquest.Model;

import com.backend.flyquest.Payload.TicketRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.UUID;

@ToString
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name="tickethistory")
public class Ticket{
    @Id
    @Column(name="ticketid")
    private String ticketId;
    @Column(name="flightid")
    private String flightId;
    @Column(name="accountid")
    private String accountId;
    @Column(name="datebooked")
    private java.sql.Timestamp dateBooked;
    @Column(name="seattype")
    private int seatType;
    @Column(name="ticketstate")
    private int state;

    public Ticket(TicketRequest ticketPayload) {
        this.ticketId = UUID.randomUUID().toString().replace("-", "");
        this.flightId = ticketPayload.getFlightId();
        this.accountId = ticketPayload.getAccountId();
        this.dateBooked =
                Timestamp.from(
                ZonedDateTime.ofInstant(Instant.now(), ZoneId.of("UTC"))
                        .toInstant());
        this.seatType = ticketPayload.getSeatType();
        this.state = 0;
    }
}
