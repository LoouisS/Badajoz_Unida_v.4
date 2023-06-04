package com.badajoz_unida.evg.entity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="usuarios_intereses")
public class UsuariosIntereses {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long userInteresId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuarios usuarios;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "interes_id", nullable = false)
    private Intereses intereses;
}
