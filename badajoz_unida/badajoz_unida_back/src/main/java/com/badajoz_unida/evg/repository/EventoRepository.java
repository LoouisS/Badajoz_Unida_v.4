package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Eventos, Integer> {
    @Override
    List<Eventos> findAll();
    List<Eventos> findAllByNombreLikeAndFechaHoraBetweenAndLocalizacionLikeAndIntereses(
            String nombre, Date fechaIni, Date fechaEnd, String localizacion, Intereses intereses);


    List<Eventos> findAll(Specification<Eventos> specification);
    List<Eventos>findAllByNombre(String nombre);
}
