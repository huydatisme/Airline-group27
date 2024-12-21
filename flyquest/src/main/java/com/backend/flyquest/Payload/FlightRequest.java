package com.backend.flyquest.Payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightRequest {
    private String airlineId;
    private String flightNumber;
    private String departureID;
    private String arrivalID;
    private int availableEconomySeat;
    private int availableBusinessSeat;
    private int availableFirstclassSeat;
    private int basePrice;
    private LocalDateTime departureTime;
    private LocalDateTime expectedArrivalTime;
}
