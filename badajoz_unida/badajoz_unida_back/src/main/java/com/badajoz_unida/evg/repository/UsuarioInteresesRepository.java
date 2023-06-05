package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.entity.UsuariosIntereses;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsuarioInteresesRepository extends JpaRepository<UsuariosIntereses, Integer> {

    List<UsuariosIntereses> findAllByIntereses(Intereses intereses);
    Usuarios findByUserInteresId(Integer integer);
}
