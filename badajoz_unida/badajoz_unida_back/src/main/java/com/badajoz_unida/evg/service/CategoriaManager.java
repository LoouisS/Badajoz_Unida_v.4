package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.repository.CategoriaRepository;
import com.badajoz_unida.evg.repository.InteresesRepository;
import com.badajoz_unida.evg.utils.JavaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoriaManager implements CategoriaService{

    @Autowired
    CategoriaRepository catRepository;

    @Autowired
    InteresesRepository interesesRepository;

    JavaUtils javaUtils = new JavaUtils();

    @Override
    public List<Categorias> getAllCategorias() {
        return catRepository.findAll();
    }

    @Override
    public List<Intereses> getAllIntereses(){
        return this.interesesRepository.findAll();
    }

    @Override
    public ResponseEntity<?> saveCategoria(Categorias categoria) throws CustomException {

        this.catRepository.save(categoria);
        return new ResponseEntity<>(categoria, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> deleteCategoria(int catId){
        Categorias categoria = new Categorias();
        categoria.setCategoriaId(catId);
        this.catRepository.delete(categoria);
        return new ResponseEntity<>(categoria,HttpStatus.OK);
    }
}
