package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.EventFilter;
import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.dto.UserEventDTO;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins="http://localhost:4200")
public class EventoController {
    @Autowired
    EventoService eventoService;

    @PostMapping(value = "/save", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveEvent(HttpServletRequest request, @ModelAttribute NewEventDTO nuevoEvento){
        try{
            return new ResponseEntity<>(this.eventoService.save(nuevoEvento),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(HttpServletRequest request, @RequestBody UserEventDTO inscripcion){
        try{
            return new ResponseEntity<>(this.eventoService.registerUser(request, inscripcion),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping (value = "/allFilter")
    public ResponseEntity<?> getEventsFilter(HttpServletRequest request, @RequestBody(required = false) EventFilter evento) throws CustomException, IOException{
        try{
            return new ResponseEntity<>(this.eventoService.getAllFilter(evento),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/all")
    public ResponseEntity<?> getEvents(HttpServletRequest request) throws CustomException, IOException{
        try{
            return new ResponseEntity<>(this.eventoService.getAll(),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getEventById(HttpServletRequest request, @PathVariable Integer id) throws CustomException, IOException{
        try {
            return new ResponseEntity<>(this.eventoService.getEventoById(id), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/new")
    public ResponseEntity<?> getNewReleases(HttpServletRequest request) throws CustomException, IOException{
        try{
            return new ResponseEntity<>(this.eventoService.getNewReleases(),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/checkRegister/{eventoId}")
    public ResponseEntity<?> checkUserRegister(HttpServletRequest request, @PathVariable Integer eventoId) throws CustomException, IOException{
        try {
            return new ResponseEntity<Boolean>(this.eventoService.checkUserRegister(request, eventoId), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/userInscriptions")
    public ResponseEntity<?> getEventsByUserId(HttpServletRequest request) throws CustomException, IOException{
        try {
            return new ResponseEntity<>(this.eventoService.getEventsByUserId(request), HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/removeUser/{eventoId}")
    public ResponseEntity<?> removeUserRegister(HttpServletRequest request, @PathVariable Integer eventoId) throws CustomException, IOException{
        try {
            this.eventoService.removeUserRegister(request, eventoId);
            return new ResponseEntity<Boolean>(true, HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping(value = "/delete/{eventId}")
    public ResponseEntity<?> deleteEvent(HttpServletRequest request,@PathVariable("eventId") int idEvento) throws CustomException, IOException{
        try{
            return new ResponseEntity<>(this.eventoService.deleteEvent(idEvento),HttpStatus.OK);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping(value = "/generateExcell/{eventId}")
    public ResponseEntity<?> generateExcell(HttpServletRequest request,@PathVariable("eventId") int idEvento) throws CustomException, IOException, SQLException {
        try{
            return this.eventoService.generateExcell(idEvento);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
