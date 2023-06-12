package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.entity.Idiomas;

import java.util.List;

public interface IdiomasService {

    /**
     * Método para la obtención de todos los idiomas registrados en la base de datos
     * @return
     */
    List<Idiomas> getIdiomas();

}
