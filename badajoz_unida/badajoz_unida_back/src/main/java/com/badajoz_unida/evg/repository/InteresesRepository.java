package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.InteresesEventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InteresesRepository extends JpaRepository<Intereses, Integer> {
}
