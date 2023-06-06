package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Categorias;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categorias, Integer> {

    public List<Categorias> findAll();

    boolean existsCategoriasByTitulo(String titulo);

}
