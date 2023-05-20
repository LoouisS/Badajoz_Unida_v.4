package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.exception.CustomException;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


public interface EventoService {
    Eventos save(NewEventDTO newEvent) throws CustomException, IOException;
    List<Eventos> getAll() throws CustomException;
}
