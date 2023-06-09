package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UsuarioDTO;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.security.entity.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    UsuarioDTO getDatosUsuarioById(int usuarioId);

    void saveUsuarioChanges(int id, Usuarios usuario);

    void saveInteresesUsuarioChanges(int id, List<Intereses> intereses);

}
