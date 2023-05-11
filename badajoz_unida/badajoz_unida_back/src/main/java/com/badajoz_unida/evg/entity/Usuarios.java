package com.badajoz_unida.evg.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Table(name="usuarios")
public class Usuarios {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int userId;

    @Column(name="nombre")
    private String nombre;

    @Column(name="apellidos")
    private String apellidos;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="usuario")
    private String nombreUsuario;

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

    @ManyToMany(fetch=FetchType.EAGER)
    @JoinTable(name="usuarios_roles",joinColumns = @JoinColumn(name="usuario_id"),
            inverseJoinColumns = @JoinColumn(name = "rol_id"))
    private Set<Roles> roles=new HashSet<>();

    public Usuarios() {
    }

    public Usuarios(String nombre, String apellidos, String email, String password, String nombreUsuario, Date fchNacimiento, String tlf, Idiomas idioma) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.password = password;
        this.nombreUsuario = nombreUsuario;
        this.fchNacimiento = fchNacimiento;
        this.tlf = tlf;
        this.idioma = new Idiomas(idioma.getIdiomaId());
    }

    public Usuarios(int usuarioId) {
        this.userId = usuarioId;
    }

    /*public Usuarios(String nombre, String nombreUsuario, String email, String password) {
        this.nombre = nombre;
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.password = password;
    }*/
}
