package com.badajoz_unida.evg.utils;

import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class EventosSpecification {

    public static Specification<Eventos> withFilters(String nombre, Date fechaIni, Date fechaEnd, String localizacion, List<Intereses> intereses) {
        return new Specification<Eventos>() {
            @Override
            public Predicate toPredicate(Root<Eventos> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                List<Predicate> predicates = new ArrayList<>();

                if (nombre != null) {
                    predicates.add(builder.like(builder.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
                }

                if (fechaIni != null && fechaEnd != null) {
                    predicates.add(builder.between(root.get("fechaHora"), fechaIni, fechaEnd));
                }

                if (localizacion != null) {
                    predicates.add(builder.like(builder.lower(root.get("localizacion")), "%" + localizacion.toLowerCase() + "%"));
                }

                if (intereses != null && !intereses.isEmpty()) {
                    predicates.add(root.join("intereses").in(intereses));
                }

                return builder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
