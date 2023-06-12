package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Eventos, Integer>,JpaSpecificationExecutor<Eventos> {

    /**
     * Método para la obtención de una lista de de Eventos filtrados
     * @param specification
     * @return
     */
    List<Eventos> findAll(Specification<Eventos> specification);

    /**
     * Método para la obtención de los últimos eventos registrados
     * @return
     */
    @Query(value = "SELECT e.id, e.nombre, e.descripcion, e.detalles, e.fecha_hora, e.telefono_contacto, e.localizacion, e.latitud, e.longitud, e.img FROM eventos e ORDER BY e.id DESC LIMIT 15", nativeQuery = true)
    List<Eventos>findNewReleases();

    /**
     * Método para la obtención de un evento por su id
     * @param id
     * @return
     */
    Eventos findByEventosId(Integer id);

    /**
     * Método para la obtención de un evento por el id de un usuario participante
     * @param usuarioId
     * @return
     */
    @Query(value = "SELECT e.id, e.nombre, e.descripcion, e.detalles, e.fecha_hora, e.telefono_contacto, e.localizacion, e.latitud, e.longitud, e.img FROM eventos e INNER JOIN usuarios_eventos ue ON e.id = ue.evento_id INNER JOIN usuarios u ON ue.usuario_id = u.id WHERE u.id = :usuarioId", nativeQuery = true)
    List<Eventos>findByUsuarioId(@Param("usuarioId") Integer usuarioId);

    /**
     * Método para la comprobación de la existencia de un evento por su nombre
     * @param nombre
     * @return
     */
    boolean existsEventosByNombre(String nombre);
}
