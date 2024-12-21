package com.backend.flyquest.Controller;

import com.backend.flyquest.Model.Airport;
import com.backend.flyquest.Payload.AirportRequest;
import com.backend.flyquest.Service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController()
@RequestMapping("/airport")
@CrossOrigin(origins = "http://localhost:3000")
public class AirportController {
    @Autowired
    private AirportService airportService;

    @PostMapping("/save")
    public ResponseEntity<?> saveAirport(@RequestBody AirportRequest airportRequest) {
        try {
            Airport airport = new Airport(airportRequest);
            airportService.saveAirportToDatabase(airport);
            return ResponseEntity.ok(airport);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/savemany")
    public ResponseEntity<?> saveAirports(@RequestBody List<AirportRequest> airportRequests) {
        try {
            for (AirportRequest airportRequest : airportRequests) {
                Airport airport = new Airport(airportRequest);
                airportService.saveAirportToDatabase(airport);
            }
            return ResponseEntity.ok(airportRequests);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
