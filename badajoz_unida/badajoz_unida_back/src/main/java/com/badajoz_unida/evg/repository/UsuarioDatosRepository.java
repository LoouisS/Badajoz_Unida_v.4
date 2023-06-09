package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Usuarios;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface UsuarioDatosRepository extends JpaRepository<Usuarios, Integer> {

    @Query(value = "SELECT u.id, u.nombre, u.apellidos, u.email, u.usuario, u.password, u.fecha_nacimiento, u.telefono, u.idioma_id  FROM usuarios u WHERE u.id = :usuarioId", nativeQuery = true)
    Usuarios findUsuarioByUserId(@Param("usuarioId") int usuarioId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE usuarios SET email = :email, telefono = :telefono, idioma_id = :idiomaId WHERE id = :usuarioId", nativeQuery = true)
    void saveChanges(@Param("usuarioId") int usuarioId, @Param("email") String email, @Param("telefono") String telefono, @Param("idiomaId") int idiomaId);

}
