package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.service.IdiomasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/idiomas")
@CrossOrigin(origins="http://localhost:4200")
public class IdiomaController {

    @Autowired
    IdiomasService idiomasService;

    @GetMapping("/")
    public ResponseEntity<?> getIdiomas(HttpServletRequest request){
        try{
            return new ResponseEntity<>(this.idiomasService.getIdiomas(), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

}
