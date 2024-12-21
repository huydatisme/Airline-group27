package com.backend.flyquest.Service.ServiceImp;

import com.backend.flyquest.Model.Airline;
import com.backend.flyquest.Repository.AirlineRepository;
import com.backend.flyquest.Service.AirlineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AirlineServiceImp implements AirlineService {
    @Autowired
    private AirlineRepository airlineRepository;
    @Override
    public void saveAirlineToDatabase(Airline airline) {
        airlineRepository.save(airline);
    }
}
