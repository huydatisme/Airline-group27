package com.backend.flyquest.Service.ServiceImp;

import com.backend.flyquest.DTO.FlightDTO;
import com.backend.flyquest.Model.Flight;
import com.backend.flyquest.Repository.CustomRepository.FlightCustomRepository;
import com.backend.flyquest.Repository.FlightRepository;
import com.backend.flyquest.Service.FlightService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

@Service
public class FlightServiceImp implements FlightService {
    @Autowired
    private FlightRepository flightRepository;
    @Autowired
    private FlightCustomRepository flightCustomRepository;

    @Override
    public Flight GetFlightByFlightId(String flightId) {
        return flightRepository.getFlightByFlightId(flightId);
    }

    @Override
    public void EditDepartureTimeAndArrivalTime(Timestamp departureTime, Timestamp arrivalTime, String flightID) {
        flightCustomRepository.EditDepartureTimeAndExpectedArrival(departureTime, arrivalTime, flightID);
    }

    @Override
    public List<FlightDTO> getAllFlights() {
        return flightCustomRepository.getAllFlights();
    }

    @Override
    public void saveFlightToDatabase(Flight flight) {
        flightRepository.save(flight);
    }

    @Override
    public List<FlightDTO> getAllFlightsFromDepartureToDestination(String departure, String destination) {
        return flightCustomRepository.findFlightByDepartureAndDestination(departure, destination);
    }
}