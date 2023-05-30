package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Intereses;

import java.util.List;

public interface CategoriaService {
    List<Categorias> getAllCategorias();

    List<Intereses> getAllIntereses();
}
