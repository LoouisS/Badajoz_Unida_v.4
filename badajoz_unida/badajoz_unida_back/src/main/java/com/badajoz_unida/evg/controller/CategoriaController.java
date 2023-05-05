package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.Mensaje;
import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Roles;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins="http://localhost:4200")
public class CategoriaController {

    @Autowired
    CategoriaService catService;

    @GetMapping("/all")
    public List<Categorias> getAllCategorias(){
       return this.catService.getAllCategorias();
    }
}
