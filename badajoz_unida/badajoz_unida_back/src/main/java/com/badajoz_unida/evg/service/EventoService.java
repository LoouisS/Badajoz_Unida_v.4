package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.EventFilter;
import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.dto.UserEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.UsuariosEventos;
import com.badajoz_unida.evg.exception.CustomException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;


public interface EventoService {
    Eventos save(NewEventDTO newEvent) throws CustomException, IOException;
    List<Eventos> getAll() throws CustomException;
    List<Eventos> getNewReleases() throws CustomException;
    Eventos getEventoById(Integer id) throws CustomException, IOException;
    List<Eventos> getAllFilter(EventFilter evento) throws CustomException;
    UsuariosEventos registerUser(HttpServletRequest request, UserEventDTO inscripcion) throws CustomException, IOException;
    Boolean checkUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException;
    void removeUserRegister(HttpServletRequest request, Integer eventoId) throws CustomException, IOException;
}
