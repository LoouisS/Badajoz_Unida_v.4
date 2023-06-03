package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.Mensaje;
import com.badajoz_unida.evg.dto.UserInterestDTO;
import com.badajoz_unida.evg.entity.*;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.service.CategoriaService;
import com.badajoz_unida.evg.service.UsuarioInteresesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
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

    @Autowired
    UsuarioInteresesService usuarioInteresesService;

    @GetMapping("/all")
    @PermitAll
    public List<Categorias> getAllCategorias(){

        return this.catService.getAllCategorias();
    }
    @GetMapping("/interesesAll")
    @PermitAll
    public List<Intereses> getAllIntereses(){

        return this.catService.getAllIntereses();
    }
    @PostMapping("register/c")
    public ResponseEntity<?> registrarIntereses(@RequestBody UserInterestDTO interesesUsuario){
        return this.usuarioInteresesService.save(interesesUsuario);
    }
    @PostMapping("registrarCategoria")
    public ResponseEntity<?> registrarCategoria(@RequestBody Categorias categoria){
        return this.catService.saveCategoria(categoria);
    }

    @DeleteMapping("eliminarCategoria/{categoriaId}")
    public ResponseEntity<?> eliminarCategoria(HttpServletRequest request, @PathVariable("categoriaId") int catId){
        return this.catService.deleteCategoria(catId);
    }

}
