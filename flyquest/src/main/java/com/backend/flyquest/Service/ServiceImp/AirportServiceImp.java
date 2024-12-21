package com.backend.flyquest.Service.ServiceImp;

import com.backend.flyquest.Model.Airport;
import com.backend.flyquest.Repository.AirportRepository;
import com.backend.flyquest.Service.AirportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirportServiceImp implements AirportService {
    @Autowired
    AirportRepository airportRepository;
    @Override
    public void saveAirportToDatabase(Airport airport){
        airportRepository.save(airport);
    }
}
