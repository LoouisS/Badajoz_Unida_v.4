package com.badajoz_unida.evg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="configuracion")
public class Configuracion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int configuracionId;

    @Column(name = "telefono_contacto")
    private int telefonoContacto;

    @Column(name = "email_contacto")
    private String emailContacto;
}
