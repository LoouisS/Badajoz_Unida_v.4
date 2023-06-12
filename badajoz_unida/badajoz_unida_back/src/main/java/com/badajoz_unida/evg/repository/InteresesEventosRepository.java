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

    /**
     * Método para la obtención de la asociación de evento e intereses por el id de un evento
     * @param eventoId
     * @return
     */
    List<InteresesEventos> findAllByEventoEventosId(Integer eventoId);

    /**
     * Método para la obtención de la asociación de evento e intereses por el objeto de intereses
     * @param intereses
     * @return
     */
    List<InteresesEventos> findAllByInteres(Intereses intereses);

    /**
     * Método para la eliminación de la asociación de un evento e intereses por el identificador de la asociación en la base de datos
     * @param eventoId
     */
    @Transactional
    void  deleteAllByEventoEventosId(Integer eventoId);
}
