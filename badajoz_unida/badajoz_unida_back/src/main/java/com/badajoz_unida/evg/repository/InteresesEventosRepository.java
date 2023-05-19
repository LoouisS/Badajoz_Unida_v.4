package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.InteresesEventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteresesEventosRepository extends JpaRepository<InteresesEventos, Integer> {
}
