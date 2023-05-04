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
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuarios usuarios;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interes_id", nullable = false)
    private Intereses intereses;
}
