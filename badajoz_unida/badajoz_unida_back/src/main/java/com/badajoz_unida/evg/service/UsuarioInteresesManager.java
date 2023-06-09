package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UserInterestDTO;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.entity.UsuariosIntereses;
import com.badajoz_unida.evg.repository.UsuarioInteresesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioInteresesManager implements UsuarioInteresesService{

    @Autowired
    UsuarioInteresesRepository usuarioInteresesRepository;

    public ResponseEntity<?> save(UserInterestDTO interesesUsuario){
        for (int i = 0; i< interesesUsuario.getIntereses().size(); i++){
            UsuariosIntereses usuariosIntereses = new UsuariosIntereses();
            Usuarios usuarios = new Usuarios();
            usuarios.setUserId(interesesUsuario.getUsuarioId());
            usuariosIntereses.setUsuarios(usuarios);
            usuariosIntereses.setIntereses(interesesUsuario.getIntereses().get(i));
            this.usuarioInteresesRepository.save(usuariosIntereses);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public void deleteInteresesByUserId(int usuarioId){
        this.usuarioInteresesRepository.deleteByUsuariosUserId(usuarioId);
    }

}
