package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Idiomas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IdiomasRepository extends JpaRepository<Idiomas, Integer> {
}
