package com.backend.flyquest.Payload;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@NonNull
public class AirportRequest {
    private String location;
    private String name;
    private String airportCode;
    private String country;
}
