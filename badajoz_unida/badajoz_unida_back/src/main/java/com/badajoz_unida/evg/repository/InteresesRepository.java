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
    boolean existsByInteresId(Intereses interes);

    @Override
    List<Intereses> findAll();

}
