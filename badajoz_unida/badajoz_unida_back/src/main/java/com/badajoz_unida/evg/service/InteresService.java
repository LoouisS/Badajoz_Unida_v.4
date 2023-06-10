package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.CatFilter;
import com.badajoz_unida.evg.dto.InteresesUsuariosDTO;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.exception.CustomException;
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
    ResponseEntity<?> save(InteresesUsuariosDTO interes) throws CustomException;

    /**
     * Método para eliminar un interés registrado en la base de datos
     * @param intId
     * @return
     */
    ResponseEntity<?> delete(int intId);

    /**
     * Métodos para la obtención de intereses filtrados
     * @param filtro
     * @return
     */
    ResponseEntity<?> getAllInteresesFilter(CatFilter filtro);
}
