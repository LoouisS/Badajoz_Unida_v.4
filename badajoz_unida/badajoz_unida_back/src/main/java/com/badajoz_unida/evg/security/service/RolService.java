package com.badajoz_unida.evg.security.service;

import com.badajoz_unida.evg.entity.Roles;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.security.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
public class RolService {
    @Autowired
    private RolRepository rolRepository;

    public Optional<Roles> findByTitulo(RolNombre rolNombre){
        return rolRepository.findByRolNombre(rolNombre);
    }

    public void save(Roles rol){
        rolRepository.save(rol);
    }
}
