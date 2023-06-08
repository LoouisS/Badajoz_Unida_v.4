package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.service.JwtService;
import com.badajoz_unida.evg.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins="http://localhost:4200")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    JwtService jwtService;

    @GetMapping("/datos")
    public ResponseEntity<?> getDatosUsuarioById(HttpServletRequest request){
        try{
            int id = this.jwtService.getIdFromToken(request);
            return new ResponseEntity<>(this.usuarioService.getDatosUsuarioById(id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/save")
    public void saveUsuarioChanges(HttpServletRequest request, @RequestBody Usuarios usuario){
        try{
            int id = this.jwtService.getIdFromToken(request);
            this.usuarioService.saveUsuarioChanges(id, usuario);
        }catch (Exception e){
        }
    }

}
