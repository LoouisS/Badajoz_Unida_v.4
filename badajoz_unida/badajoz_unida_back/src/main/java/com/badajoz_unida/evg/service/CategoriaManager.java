package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.CatFilter;
import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.exception.ErrorCode;
import com.badajoz_unida.evg.repository.CategoriaRepository;
import com.badajoz_unida.evg.repository.InteresesRepository;
import com.badajoz_unida.evg.utils.CategoriaSpecification;
import com.badajoz_unida.evg.utils.EventosSpecification;
import com.badajoz_unida.evg.utils.JavaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<?> saveCategoria(Categorias categoria, Boolean create) throws CustomException {
        if (this.catRepository.existsCategoriasByTitulo(categoria.getTitulo()) && create){
            throw new CustomException(ErrorCode.ERROR_EQUALS_NAME);
        }

        this.javaUtils.validarNuevaCategoria(categoria);
        if(create){
            this.catRepository.save(categoria);
            return new ResponseEntity<>(categoria,HttpStatus.CREATED);
        } else {
            Optional<Categorias> categoriaToSave = this.catRepository.findById(categoria.getCategoriaId());
            categoriaToSave.get().setTitulo(categoria.getTitulo());
            categoriaToSave.get().setActivo(categoria.isActivo());
            categoriaToSave.get().setDescripcion(categoria.getDescripcion());
            this.catRepository.save(categoriaToSave.get());
            return new ResponseEntity<>(categoriaToSave.get(), HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<?> deleteCategoria(int catId){
        Categorias categoria = new Categorias();
        categoria.setCategoriaId(catId);
        this.catRepository.delete(categoria);
        return new ResponseEntity<>(categoria,HttpStatus.OK);
    }

    @Override
    public List<Categorias> getAllCategoriasFilter(CatFilter filtro){
        Specification<Categorias> specification = CategoriaSpecification.withFilters(
                filtro.getTitulo(),
                filtro.isActivo()
        );
        return this.catRepository.findAll(specification);
    }
}
