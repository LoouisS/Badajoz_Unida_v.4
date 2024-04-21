package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Usuarios;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioDatosRepository extends JpaRepository<Usuarios, Integer> {

    /**
     * Método para la obtención de toddos los datos de un usuario por su id
     * @param usuarioId
     * @return
     */
    @Query(value = "SELECT u.id, u.nombre, u.apellidos, u.email, u.usuario, u.password, u.fecha_nacimiento, u.telefono, u.idioma_id  FROM usuarios u WHERE u.id = :usuarioId", nativeQuery = true)
    Usuarios findUsuarioByUserId(@Param("usuarioId") int usuarioId);

    /**
     * Método para la actualización de los datos asociados a un usuario
     * @param usuarioId
     * @param email
     * @param telefono
     * @param idiomaId
     */
    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE usuarios SET email = :email, telefono = :telefono, idioma_id = :idiomaId WHERE id = :usuarioId", nativeQuery = true)
    void saveChanges(@Param("usuarioId") int usuarioId, @Param("email") String email, @Param("telefono") String telefono, @Param("idiomaId") String idiomaId);

    /**
     * Método para la obtencion de los usuarios filtrdos
     * @param specification
     * @return
     */
    List<Usuarios> findAll(Specification<Usuarios> specification);
}
