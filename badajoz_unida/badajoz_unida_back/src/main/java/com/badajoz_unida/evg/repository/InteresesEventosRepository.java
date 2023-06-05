package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.InteresesEventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InteresesEventosRepository extends JpaRepository<InteresesEventos, Integer> {

    List<InteresesEventos> findAllByEventoEventosId(Integer eventoId);

    List<InteresesEventos> findAllByInteres(Intereses intereses);
    @Transactional
    void  deleteAllByEventoEventosId(Integer eventoId);
}
