package com.badajoz_unida.evg.security.repository;

import com.badajoz_unida.evg.security.entity.Rol;
import com.badajoz_unida.evg.security.enums.RolNombre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RolRepository extends JpaRepository<Rol,Integer> {
    Optional<Rol> findByRolNombre(RolNombre rolNombre);
}
