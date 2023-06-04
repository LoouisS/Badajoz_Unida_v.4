package com.badajoz_unida.evg.dto;

import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Usuarios;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
public class InteresesUsuariosDTO {

    private int interesId;

    private String titulo;


    private String descripcion;

    private boolean activo;

    private Categorias categoria;


    private List<Usuarios> usuarios;

    private List<Eventos> eventos;
}
