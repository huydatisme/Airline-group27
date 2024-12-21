package com.backend.flyquest.Controller;

import com.backend.flyquest.Model.Airline;
import com.backend.flyquest.Payload.AirlineRequest;
import com.backend.flyquest.Service.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;

@RestController
@RequestMapping("/airline")
@CrossOrigin(origins = "http://localhost:3000")
public class AirlineController {
    @Autowired
    private AirlineService airlineService;
    @PostMapping("/save")
    public ResponseEntity<?> save(@RequestBody AirlineRequest airlineRequest) {
        try {
            airlineService.saveAirlineToDatabase(new Airline(airlineRequest));
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/savemany")
    public ResponseEntity<?> saveMany(@RequestBody List<AirlineRequest> airlineRequestList) {
        try {
            for (AirlineRequest airlineRequest : airlineRequestList) {
                airlineService.saveAirlineToDatabase(new Airline(airlineRequest));
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
