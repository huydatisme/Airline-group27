package com.backend.flyquest.Repository.CustomRepository;

import com.backend.flyquest.DTO.FlightDTO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FlightCustomRepository {
    public List<FlightDTO> getAllFlights();
    public List<FlightDTO> findFlightByDepartureAndDestination(String departure, String destination);
    public void EditDepartureTimeAndExpectedArrival(java.sql.Timestamp departure, java.sql.Timestamp arrival, String flightid);
}
