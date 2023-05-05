package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaManager implements CategoriaService{

    @Autowired
    CategoriaRepository catRepository;

    @Override
    public List<Categorias> getAllCategorias() {
        return catRepository.findAll();
    }
}
