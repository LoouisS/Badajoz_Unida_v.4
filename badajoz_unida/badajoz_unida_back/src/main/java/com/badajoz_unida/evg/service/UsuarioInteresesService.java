package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UserInterestDTO;
import com.badajoz_unida.evg.entity.UsuariosIntereses;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UsuarioInteresesService {
    ResponseEntity<?> save(UserInterestDTO interesesUsuario);
}
