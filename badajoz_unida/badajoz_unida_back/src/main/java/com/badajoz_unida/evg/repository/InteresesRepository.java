package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.InteresesEventos;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InteresesRepository extends JpaRepository<Intereses, Integer> {

    /**
     * Método para la comprobación de un registro de intereses por su id en base de datos
     * @param interes
     * @return
     */
    boolean existsByInteresId(Intereses interes);

    /**
     * Método para la comprobación de un registro de intereses por su titulo en base de datos
     * @param titulo
     * @return
     */
    boolean existsInteresesByTitulo(String titulo);

    /**
     * Método para la obtención de todos los registros de intereses en la base de datos de la aplicación
     * @return
     */
    @Override
    List<Intereses> findAll();

}
