package com.badajoz_unida.evg.utils;

import com.badajoz_unida.evg.entity.Roles;
import com.badajoz_unida.evg.entity.Usuarios;
import org.springframework.data.jpa.domain.Specification;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class UsuarioSpecification {

    /**
     * Método para la generación de un Specification para poder realizar el filtrado de Usuarios
     * @param nombre
     * @param nombreUsuario
     * @param email
     * @param rol
     * @return
     */
    public static Specification<Usuarios> withFilters(String nombre, String nombreUsuario, String email, Roles rol) {
        return new Specification<Usuarios>() {
            @Override
            public Predicate toPredicate(Root<Usuarios> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                List<Predicate> predicates = new ArrayList<>();

                if (nombre != null) {
                    predicates.add(builder.like(builder.lower(root.get("nombre")), "%" + nombre.toLowerCase() + "%"));
                }

                if (nombreUsuario != null) {
                    predicates.add(builder.like(builder.lower(root.get("nombreUsuario")), "%" + nombreUsuario.toLowerCase() + "%"));
                }

                if (email != null) {
                    predicates.add(builder.like(builder.lower(root.get("email")), "%" + email.toLowerCase() + "%"));
                }

                if (rol != null) {
                    predicates.add(builder.isMember(rol, root.get("roles")));
                }

                return builder.and(predicates.toArray(new Predicate[predicates.size()]));
            }
        };
    }
}
