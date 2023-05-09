package com.badajoz_unida.evg.dto;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserInterestDTO {
    private int usuarioId;
    private List<Intereses> intereses;
}
