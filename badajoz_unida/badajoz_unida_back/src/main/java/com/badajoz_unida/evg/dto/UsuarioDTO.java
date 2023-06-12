package com.badajoz_unida.evg.dto;

import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Setter
@Getter
public class UsuarioDTO {

    private int id;
    private String nombre;
    private String apellidos;
    private String email;
    private String usuario;
    private Date fechaNacimiento;
    private String telefono;
    private int idiomaId;
    private List<Intereses> intereses;

    public UsuarioDTO(){

    }

    public UsuarioDTO(int id, String nombre, String apellidos, String email, String usuario, Date fechaNacimiento, String telefono, int idiomaId, List<Intereses> intereses){
        this.id = id;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.usuario = usuario;
        this.fechaNacimiento = fechaNacimiento;
        this.telefono = telefono;
        this.idiomaId = idiomaId;
        this.intereses = intereses;
    }

}
