package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.CatFilter;
import com.badajoz_unida.evg.dto.InteresesUsuariosDTO;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.service.InteresService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/intereses")
@CrossOrigin(origins="http://localhost:4200")
public class InteresesController {

    @Autowired
    InteresService interesService;


    /**
     * Endpoint para la obtención de todos los intereses registrados en la aplicación
     * @return
     */
    @GetMapping("/getAll")
    public ResponseEntity<?> getAllIntereses(){
        try{
            return this.interesService.getAll();
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para la obtención de los intereses filtrados en la aplicación
     * @param filtro
     * @return
     */
    @PostMapping("/getAllFilter")
    public ResponseEntity<?> getAllInteresesFilter(@RequestBody CatFilter filtro){
        try{
            return this.interesService.getAllInteresesFilter(filtro);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para el registro de un nuevo interés en el sistema
     * @param interes
     * @return
     */
    @PostMapping("/save")
    public ResponseEntity<?> saveInteres(@RequestBody InteresesUsuariosDTO interes){
        try{
            return this.interesService.save(interes);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.CONFLICT);
        } catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para el eliminado de un registro de tipo interés
     * @param intId
     * @return
     */
    @DeleteMapping("/delete/{interesId}")
    public ResponseEntity<?> deleteInteres(@PathVariable("interesId") int intId){
        try{
            return this.interesService.delete(intId);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }
}
