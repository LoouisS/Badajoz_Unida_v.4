package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.UpdateRolUserDTO;
import com.badajoz_unida.evg.dto.UsuarioDTO;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.security.entity.Usuario;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {

    /**
     * Método para la obtención de los datos asociados a un usuario de la aplicación
     * @param usuarioId
     * @return
     */
    UsuarioDTO getDatosUsuarioById(int usuarioId);

    /**
     * Método para la actualización de los datos asociados a un usuario del sistema
     * @param id
     * @param usuario
     */
    void saveUsuarioChanges(int id, Usuarios usuario);

    /**
     * Método para la actualización de intereses de un usuario
     * @param id
     * @param intereses
     */
    void saveInteresesUsuarioChanges(int id, List<Intereses> intereses);

    /**
     * Método para la obtención de todos los usuarios registrados en la base de datos del sistema
     */
    ResponseEntity<?> getAll() throws CustomException;

    ResponseEntity<?> updateRol(UpdateRolUserDTO roluDto) throws CustomException;
}
