package com.badajoz_unida.evg.security.repository;

import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.security.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuarios,Integer> {

    /**
     * Método para la  comprobación de un usuario por su nick o nombre de usuario
     * @param nombreUsuario
     * @return
     */
    Optional<Usuarios> findByNombreUsuario(String nombreUsuario);

    /**
     * Método para la comprobación de la existencia de un usuario por su nommbre de usuario
     * @param nombreUsuario
     * @return
     */
    boolean existsByNombreUsuario(String nombreUsuario);

    /**
     * Método para la comprobación de la existencia de un usuario a través de su email
     * @param email
     * @return
     */
    boolean existsByEmail(String email);
}
