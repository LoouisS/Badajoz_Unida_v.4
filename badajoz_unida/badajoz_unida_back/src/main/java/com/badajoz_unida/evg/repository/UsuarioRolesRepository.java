package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.UsuarioRoles;
import com.badajoz_unida.evg.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsuarioRolesRepository extends JpaRepository<UsuarioRoles, Integer> {
    /**
     * Método para la obtención de la relación de un usuario con sus roles en la base de datos
     * @param id
     * @return
     */
    UsuarioRoles findByUsuariosUserId(Integer id);
}
