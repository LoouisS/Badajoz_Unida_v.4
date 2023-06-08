package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UsuarioDTO;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.repository.UsuarioDatosRepository;
import com.badajoz_unida.evg.security.entity.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioManager implements UsuarioService{

    @Autowired
    UsuarioDatosRepository usuarioDatosRepository;

    @Override
    public UsuarioDTO getDatosUsuarioById(int usuarioId) {
        Usuarios usuario = this.usuarioDatosRepository.findUsuarioByUserId(usuarioId);
        return new UsuarioDTO(usuario.getNombre(), usuario.getApellidos(), usuario.getEmail(), usuario.getNombreUsuario(), usuario.getFchNacimiento(), usuario.getTlf(), usuario.getIdioma().getIdiomaId(), usuario.getIntereses());
    }

    @Override
    public void saveUsuarioChanges(int id, Usuarios usuario){
        this.usuarioDatosRepository.saveChanges(id, usuario.getEmail(), usuario.getTlf(), usuario.getIdioma().getIdiomaId());
    }
}
