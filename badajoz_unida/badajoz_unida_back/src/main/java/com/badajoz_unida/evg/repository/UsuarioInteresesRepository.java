package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.entity.UsuariosIntereses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioInteresesRepository extends JpaRepository<UsuariosIntereses, Integer> {

    /**
     * Método para la obtención de una lista de la asociación de un usuario con sus intereses en la aplicación
     * @param intereses
     * @return
     */
    List<UsuariosIntereses> findAllByIntereses(Intereses intereses);

    /**
     * Método para eliminar una asociación de un usuario a un interés de la aplicación
     * @param usuarioId
     */
    @Transactional
    @Modifying
    void deleteByUsuariosUserId(int usuarioId);
}
