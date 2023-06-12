package com.badajoz_unida.evg.utils;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CategoriaSpecification {
    /**
     * Método para la generación de un Specification para poder realizar el filtrado de Categorias
     * @param titulo
     * @param activo
     * @return
     */
    public static Specification<Categorias> withFilters(String titulo, boolean activo) {
        return new Specification<Categorias>() {
            @Override
            public Predicate toPredicate(Root<Categorias> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                List<Predicate> predicates = new ArrayList<>();

                if (titulo != null) {
                    predicates.add(builder.like(builder.lower(root.get("titulo")), "%" + titulo.toLowerCase() + "%"));
                }

                predicates.add(builder.equal(root.get("activo"), activo));

                return builder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
