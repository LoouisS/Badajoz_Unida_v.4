package com.badajoz_unida.evg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="intereses")
public class Intereses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int interesId;

    @Column(name="titulo")
    private String titulo;

    @Column(name="descripcion")
    private String descripcion;

    @Column(name="activo")
    private boolean activo;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categorias categoria;

    @ManyToMany(mappedBy = "intereses")
    private List<Usuarios> usuarios;

    @ManyToMany(mappedBy = "intereses")
    private List<Eventos> eventos;

}
