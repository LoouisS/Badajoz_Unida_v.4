package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.InteresesUsuariosDTO;
import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.service.InteresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/intereses")
@CrossOrigin(origins="http://localhost:4200")
public class InteresesController {

    @Autowired
    InteresService interesService;

    @GetMapping("/getAll")
    public ResponseEntity<?> getAllIntereses(){
        try{
            return this.interesService.getAll();
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save")
    public ResponseEntity<?> saveInteres(@RequestBody InteresesUsuariosDTO interes){
        try{
            return this.interesService.save(interes);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/delete/{interesId}")
    public ResponseEntity<?> deleteInteres(@PathVariable("interesId") int intId){
        try{
            return this.interesService.delete(intId);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }
}
