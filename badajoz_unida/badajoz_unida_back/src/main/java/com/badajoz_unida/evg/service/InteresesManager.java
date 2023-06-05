package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.InteresesUsuariosDTO;
import com.badajoz_unida.evg.entity.*;
import com.badajoz_unida.evg.repository.InteresesEventosRepository;
import com.badajoz_unida.evg.repository.InteresesRepository;
import com.badajoz_unida.evg.repository.UsuarioInteresesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InteresesManager implements InteresService{

    @Autowired
    InteresesRepository interesesRepository;
    @Autowired
    UsuarioInteresesRepository userInteresRepository;

    @Autowired
    InteresesEventosRepository iEventos;

    @Override
    public ResponseEntity<?> getAll(){
        List<Intereses> intereses= this.interesesRepository.findAll();
        List<InteresesUsuariosDTO> interesesUsuariosDTOS = new ArrayList<>();
        for (Intereses interes : intereses){
            List<Usuarios> usuarios = new ArrayList<>();
            List<Eventos> eventos = new ArrayList<>();
            InteresesUsuariosDTO interesesUsuariosDTO = new InteresesUsuariosDTO();
            interesesUsuariosDTO.setInteresId(interes.getInteresId());
            interesesUsuariosDTO.setTitulo(interes.getTitulo());
            interesesUsuariosDTO.setDescripcion(interes.getDescripcion());
            interesesUsuariosDTO.setActivo(interes.isActivo());

            List<UsuariosIntereses> userInteres = this.userInteresRepository.findAllByIntereses(interes);
            for (UsuariosIntereses usuarios1 : userInteres){
                usuarios.add(usuarios1.getUsuarios());
            }
            interesesUsuariosDTO.setUsuarios(usuarios);
            List <InteresesEventos> interesesEventos = this.iEventos.findAllByInteres(interes);
            for (InteresesEventos i: interesesEventos){
                eventos.add(i.getEvento());
            }
            interesesUsuariosDTO.setEventos(eventos);
            interesesUsuariosDTOS.add(interesesUsuariosDTO);
        }
        return new ResponseEntity<>(interesesUsuariosDTOS, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> save(InteresesUsuariosDTO interesDto){
        Intereses interes = new Intereses();
        interes.setInteresId(interesDto.getInteresId());
        interes.setTitulo(interesDto.getTitulo());
        interes.setDescripcion(interesDto.getDescripcion());
        interes.setActivo(interesDto.isActivo());

        interes.setCategoria(interesDto.getCategoria());

        this.interesesRepository.save(interes);
        return new ResponseEntity<>(interes,HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> delete(int intId){
        Intereses interes = new Intereses();
        interes.setInteresId(intId);
        this.interesesRepository.delete(interes);
        return new ResponseEntity<>(interes, HttpStatus.OK);
    }
}
