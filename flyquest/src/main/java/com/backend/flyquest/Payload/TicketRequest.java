package com.backend.flyquest.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TicketRequest {
    private String flightId;
    private String accountId;
    private int seatType;
}
