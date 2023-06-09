package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.entity.UsuariosIntereses;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface UsuarioInteresesRepository extends JpaRepository<UsuariosIntereses, Integer> {

    List<UsuariosIntereses> findAllByIntereses(Intereses intereses);
    Usuarios findByUserInteresId(Integer integer);

    @Transactional
    @Modifying
    void deleteByUsuariosUserId(int usuarioId);
}
