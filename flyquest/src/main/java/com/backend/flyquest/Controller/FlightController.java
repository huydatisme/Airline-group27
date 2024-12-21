package com.backend.flyquest.Controller;

import com.backend.flyquest.DTO.FlightDTO;
import com.backend.flyquest.DTO.TimeDTO;
import com.backend.flyquest.Model.Flight;
import com.backend.flyquest.Payload.FlightRequest;
import com.backend.flyquest.Payload.GetFlightRequest;
import com.backend.flyquest.Service.FlightService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000")
public class FlightController {
    @Autowired
    private FlightService flightService;
    @PostMapping("/save")
    public ResponseEntity<?> saveFlight(@RequestBody FlightRequest flightRequest) {
        try {
            flightService.saveFlightToDatabase(new Flight(flightRequest));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/savemany")
    public ResponseEntity<?> saveManyFlights(@RequestBody List<FlightRequest> flightRequestList) {
        try {
            for (FlightRequest flightRequest : flightRequestList) {
                flightService.saveFlightToDatabase(new Flight(flightRequest));
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/getflight")
    public ResponseEntity<?> getFlights(@RequestBody GetFlightRequest flightRequest) {
        try {
            System.out.println("Request received: Departure ID = " + flightRequest.getDepartureid()
                    + ", Destination ID = " + flightRequest.getDestinationid());

            List<FlightDTO> flights = flightService.getAllFlightsFromDepartureToDestination(
                    flightRequest.getDepartureid(),
                    flightRequest.getDestinationid()
            );

            if (flights.isEmpty()) {
                return ResponseEntity.status(404).body("Không tìm thấy chuyến bay nào.");
            }

            return ResponseEntity.ok(flights);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Internal Server Error: " + e.getMessage());
        }
    }
    @GetMapping("/getallflights")
    public ResponseEntity<?> getAllFlights() {
        try {
            return ResponseEntity.ok().body(flightService.getAllFlights());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/changeflighttime")
    public ResponseEntity<?> changeFlightTime(@RequestBody TimeDTO timeDTO) {
        try {
            flightService.EditDepartureTimeAndArrivalTime(timeDTO.getDestination(), timeDTO.getArrival(), timeDTO.getFlightID());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getflightbyflightid/{Flightid}")
    public ResponseEntity<?> getFlightByFlightID(@PathVariable String Flightid) {
        try {
            System.out.println("Request received: Flight ID = " + Flightid);
            return ResponseEntity.ok().body(flightService.GetFlightByFlightId(Flightid));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
    
