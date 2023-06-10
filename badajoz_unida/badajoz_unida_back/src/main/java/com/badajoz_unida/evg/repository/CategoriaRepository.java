package com.badajoz_unida.evg.repository;

import ch.qos.logback.core.util.DefaultInvocationGate;
import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Eventos;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categorias, Integer> {
    /**
     * Método para la obtención de todas las categorías registradas en la aplicación
     * @return
     */
    List<Categorias> findAll();

    /**
     * Método para la comprobación de un registro bajo el mismo titulo de categoria
     * @param titulo
     * @return
     */
    boolean existsCategoriasByTitulo(String titulo);

    /**
     * Método para la obtención de categorias filtradas
     * @param specification
     * @return
     */
    List<Categorias> findAll(Specification<Categorias> specification);

}
