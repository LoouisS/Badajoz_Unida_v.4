package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.entity.Idiomas;
import com.badajoz_unida.evg.repository.IdiomasRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IdiomasManager implements IdiomasService{

    @Autowired
    IdiomasRepository idiomasRepository;

    @Override
    public List<Idiomas> getIdiomas(){
        return this.idiomasRepository.findAll();
    }

}
