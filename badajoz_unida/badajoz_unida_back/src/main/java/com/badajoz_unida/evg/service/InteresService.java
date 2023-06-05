package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.InteresesUsuariosDTO;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.http.ResponseEntity;

public interface InteresService {
    /**
     * Método para la obtención de todos los intereses existentes en la aplicación
     * @return
     */
    ResponseEntity<?> getAll();

    /**
     * Método para el registro o actualización de un nuevo interés
     * @param interes
     * @return
     */
    ResponseEntity<?> save(InteresesUsuariosDTO interes);

    /**
     * Método para eliminar un interés registrado en la base de datos
     * @param intId
     * @return
     */
    ResponseEntity<?> delete(int intId);
}
