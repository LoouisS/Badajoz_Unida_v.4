package com.badajoz_unida.evg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name="usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="nombre")
    private String nombre;

    @Column(name="apellidos")
    private String apellidos;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String psw;

    @Column(name="usuario")
    private String usuario;

    @Column(name="fecha_nacimiento")
    private Date fchNacimiento;

    @Column(name="telefono")
    private String tlf;

    @ManyToOne
    @JoinColumn(name="idioma_id")
    private Idiomas idioma;

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(name = "usuarios_intereses",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "interes_id"))
    private List<Intereses> intereses;

    @ManyToMany(mappedBy = "usuarios")
    private List<Eventos> eventos;
}
