package com.backend.flyquest.Service;

import com.backend.flyquest.Model.Airport;
import org.springframework.stereotype.Service;

@Service
public interface AirportService {
    public void saveAirportToDatabase(Airport airport);
}
