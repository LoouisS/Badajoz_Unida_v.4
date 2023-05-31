package com.badajoz_unida.evg.dto;

import com.badajoz_unida.evg.entity.Intereses;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
public class NewEventDTO {
    private Integer eventosId;
    private String nombre;
    private String descripcion;
    private String detalles;
    private String localizacion;


    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date fechaHora;
    private int telefonoContacto;
    private String latitud;
    private String longitud;
    private Optional<MultipartFile> imagen;
    private List<Integer> intereses;
}
