package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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
    @Query(value = "SELECT e.id, e.nombre, e.descripcion, e.detalles, e.fecha_hora, e.telefono_contacto, e.localizacion, e.latitud, e.longitud, e.img FROM eventos e ORDER BY e.id DESC LIMIT 15", nativeQuery = true)
    List<Eventos>findNewReleases();
    Eventos findByEventosId(Integer id);
    @Query(value = "SELECT e.id, e.nombre, e.descripcion, e.detalles, e.fecha_hora, e.telefono_contacto, e.localizacion, e.latitud, e.longitud, e.img FROM eventos e INNER JOIN usuarios_eventos ue ON e.id = ue.evento_id INNER JOIN usuarios u ON ue.usuario_id = u.id WHERE u.id = :usuarioId", nativeQuery = true)
    List<Eventos>findByUsuarioId(@Param("usuarioId") Integer usuarioId);
}
