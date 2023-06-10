package com.badajoz_unida.evg.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserFilter {
    private String nombre;
    private String nombreUsuario;
    private String email;
    private Integer rolId;
}
