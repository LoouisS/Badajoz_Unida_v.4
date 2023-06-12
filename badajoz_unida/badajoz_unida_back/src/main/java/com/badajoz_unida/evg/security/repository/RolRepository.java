package com.badajoz_unida.evg.security.repository;

import com.badajoz_unida.evg.entity.Roles;
import com.badajoz_unida.evg.security.enums.RolNombre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Roles,Integer> {
    /**
     * Método para la comprobación de la existencia de un rol registrado en el sistema
     * @param rolNombre
     * @return
     */
    Optional<Roles> findByRolNombre(RolNombre rolNombre);
}
