package com.badajoz_unida.evg.entity;


import com.badajoz_unida.evg.security.entity.Usuario;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Table(name="intereses_eventos")
public class InteresesEventos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long intEventid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interes_id", nullable = false)
    private Intereses interes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "evento_id", nullable = false)
    private Eventos evento;
}
