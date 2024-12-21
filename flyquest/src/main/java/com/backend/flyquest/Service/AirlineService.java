package com.backend.flyquest.Service;

import com.backend.flyquest.Model.Airline;
import org.springframework.stereotype.Service;

@Service
public interface AirlineService {
    public void saveAirlineToDatabase(Airline airline);
}
