package com.badajoz_unida.evg.entity;

import com.badajoz_unida.evg.security.enums.RolNombre;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@Table(name="roles")
public class Roles {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="titulo")
    private String titulo;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name="rol_nombre")
    private RolNombre rolNombre;

}
