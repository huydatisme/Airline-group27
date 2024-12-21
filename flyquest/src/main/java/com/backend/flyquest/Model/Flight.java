package com.backend.flyquest.Model;

import com.backend.flyquest.Payload.FlightRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity
@Table(name="flight")
public class Flight {
    @Id
    @Column(name = "flightid")
    private String flightId;
    @Column(name="airlineid")
    private String airlineId;
    @Column(name="flightnumber")
    private String flightnuber;
    @Column(name="departureid")
    private String departureId;
    @Column(name="destinationid")
    private String destinationId;
    @Column(name="availableeconomyseat")
    private int availableEconomySeat;
    @Column(name="availablebusinessseat")
    private int availableBusinessSeat;
    @Column(name="availablefirstclassseat")
    private int availableFirstClassSeat;
    @Column(name="price")
    private int basePrice;
    @Column(name="departuretime")
    private LocalDateTime departureTime;
    @Column(name="expectedarrival")
    private LocalDateTime expectedArrival;

    public Flight(FlightRequest flightRequest) {
        this.flightId = UUID.randomUUID().toString().replace("-", "");
        this.airlineId = flightRequest.getAirlineId();
        this.flightnuber = flightRequest.getFlightNumber();
        this.departureId = flightRequest.getDepartureID();
        this.destinationId = flightRequest.getArrivalID();
        this.availableEconomySeat = flightRequest.getAvailableEconomySeat();
        this.availableBusinessSeat = flightRequest.getAvailableBusinessSeat();
        this.availableFirstClassSeat = flightRequest.getAvailableFirstclassSeat();
        this.basePrice = flightRequest.getBasePrice();
        this.departureTime = flightRequest.getDepartureTime();
        this.expectedArrival = flightRequest.getExpectedArrivalTime();
    }
}
