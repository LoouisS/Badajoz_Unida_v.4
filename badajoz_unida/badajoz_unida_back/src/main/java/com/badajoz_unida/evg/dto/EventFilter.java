package com.badajoz_unida.evg.dto;

import lombok.Getter;
import lombok.Setter;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class EventFilter {
    private String nombre;
    private String localizacion;
    private Date fechaInit;
    private Date fechaEnd;
    private List<String> intereses;
}
