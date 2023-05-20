package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Eventos, Integer> {
    @Override
    List<Eventos> findAll();
}
