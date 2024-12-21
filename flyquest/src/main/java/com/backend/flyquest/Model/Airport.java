package com.backend.flyquest.Model;

import com.backend.flyquest.Payload.AirportRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "airport" )
public class Airport {
    @Id
    @Column(name="airportid")
    private String airportID;
    @Column(name="location")
    private String location;
    @Column(name="name")
    private String name;
    @Column(name="airportcode")
    private String airportCode;
    @Column(name="country")
    private String country;

    public Airport(AirportRequest airportRequest) {
        this.location = airportRequest.getLocation();
        this.name = airportRequest.getName();
        this.airportCode = airportRequest.getAirportCode();
        this.country = airportRequest.getCountry();
        this.airportID = UUID.randomUUID().toString().replace("-", "");
    }
}
