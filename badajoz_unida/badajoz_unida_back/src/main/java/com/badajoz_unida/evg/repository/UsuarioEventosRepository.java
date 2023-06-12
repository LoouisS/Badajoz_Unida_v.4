package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.UsuariosEventos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;

public interface UsuarioEventosRepository extends JpaRepository<UsuariosEventos, Integer> {

    /**
     * Método para la comprobación de la existencia de un participante de tipo Usuario en un eveneto a través de ambos identificadores
     * en la aplicación
     * @param usuarioId
     * @param eventoId
     * @return
     */
    @Query(value = "SELECT COUNT(ue.id) FROM usuarios_eventos ue WHERE ue.usuario_id = :usuarioId AND ue.evento_id = :eventoId", nativeQuery = true)
    Integer checkByUsuarioIdAndEventoId(@Param("usuarioId") Integer usuarioId, @Param("eventoId") Integer eventoId);

    /**
     * Método para eliminar la participación de un usuario a un evento
     * @param usuarioId
     * @param eventoId
     */
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM usuarios_eventos WHERE usuario_id = :usuarioId AND evento_id = :eventoId", nativeQuery = true)
    void removeUserRegister(@Param("usuarioId") Integer usuarioId, @Param("eventoId") Integer eventoId);

}
