package com.backend.flyquest.Model;

import com.backend.flyquest.Payload.AirlineRequest;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="airline")
public class Airline {
    @Id
    @Column(name="airlineid")
    private String airlineId;
    @Column(name="name")
    private String name;
    @Column(name="airlinecode")
    private String airlinecCode;

    public Airline(AirlineRequest airlineRequest) {
        this.airlineId = UUID.randomUUID().toString().replace("-", "");
        this.name = airlineRequest.getName();
        this.airlinecCode = airlineRequest.getAirlineCode();
    }
}
