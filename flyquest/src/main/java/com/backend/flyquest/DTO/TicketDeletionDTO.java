package com.backend.flyquest.DTO;

import lombok.*;
import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
public class TicketDeletionDTO {
    private java.sql.Timestamp departuretime;
    private int seattype;
    private String flightid;
}