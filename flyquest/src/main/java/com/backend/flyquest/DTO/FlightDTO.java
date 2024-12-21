package com.backend.flyquest.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FlightDTO {
    private String flightid;
    private String flightnumber;
    private int availableeconomyseat;
    private int availablebusinessseat;
    private int availablefirstclassseat ;
    private int price;
    private java.sql.Timestamp departuretime;
    private java.sql.Timestamp expectedarrival;
    private String airlinename;
    private String airlinecode;
    private String departurelocation;
    private String departureairportname;
    private String departureairportcode;
    private String destinationlocation;
    private String destinationairportname;
    private String destinationairportcode;
}
