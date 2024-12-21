package com.backend.flyquest.Repository;

import com.backend.flyquest.Model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightRepository extends JpaRepository<Flight, String> {
    public Flight getFlightByFlightId(String flightId);
}