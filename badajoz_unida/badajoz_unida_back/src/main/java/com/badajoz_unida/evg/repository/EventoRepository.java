package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository<Eventos, Integer> {
}
