package com.backend.flyquest.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class TimeDTO {
    private Timestamp destination;
    private Timestamp arrival;
    private String flightID;
}