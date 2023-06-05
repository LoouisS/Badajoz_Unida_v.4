package com.badajoz_unida.evg.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

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
    @JsonIgnore
    private Categorias categoria;

    @ManyToMany(mappedBy = "intereses")
    @JsonIgnore
    private List<Usuarios> usuarios;

    @ManyToMany(mappedBy = "intereses")
    @JsonIgnore
    private List<Eventos> eventos;

    public Intereses(){

    }

    public Intereses(int interesId){
        this.interesId = interesId;
    }

}
