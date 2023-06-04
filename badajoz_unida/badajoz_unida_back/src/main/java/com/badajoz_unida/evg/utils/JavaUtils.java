package com.badajoz_unida.evg.utils;

import com.badajoz_unida.evg.dto.NewEventDTO;
import com.badajoz_unida.evg.entity.Eventos;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.exception.ErrorCode;
import com.badajoz_unida.evg.repository.EventoRepository;
import com.badajoz_unida.evg.repository.InteresesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;


public class JavaUtils {

    public void validateRegister(Usuarios nuevoUsuario) throws CustomException{
        if (nuevoUsuario.getNombre() == null || nuevoUsuario.getApellidos()==null || nuevoUsuario.getPassword() == null ||
        nuevoUsuario.getFchNacimiento() == null || nuevoUsuario.getTlf() == null || nuevoUsuario.getNombreUsuario() == null ||
        nuevoUsuario.getIdioma() == null){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }

        if (!nuevoUsuario.getNombre().matches("^([a-zA-ZÀ-ÿ\\u00f1\\u00d1]{4,30})(\\s{0,1}[a-zA-ZÀ-ÿ\\u00f1\\u00d1]{2,29}){0,1}$"
        )) {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }

        if (!nuevoUsuario.getApellidos().matches("^(([a-zA-ZÀ-ÿ\\u00f1\\u00d1]){4,30})(\\s{0,1}[a-zA-ZÀ-ÿ\\u00f1\\u00d1]{2,29}){0,1}$")) {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }

        if (!nuevoUsuario.getPassword().matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\\d$@$!%*?&#.$($)$-$_]{8,20}$")) {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (!nuevoUsuario.getEmail().matches("^[-\\w.%+]{1,64}@(?:[A-Za-z0-9-]{1,63}\\.){1,125}[A-Za-z]{2,63}$")) {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        Date fechaNacimientoDate = nuevoUsuario.getFchNacimiento();
        Instant instant = fechaNacimientoDate.toInstant();
        LocalDate fechaNacimiento = instant.atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate fechaMinima = LocalDate.now().minusYears(16);
        if (fechaNacimiento.isAfter(fechaMinima)) {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }

        if (nuevoUsuario.getTlf().length()<9){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
    }
    public void validateCrearEventos(NewEventDTO evento) throws CustomException{
        if (evento.getNombre() == null || evento.getDescripcion() == null || evento.getDetalles() == null ||
            evento.getFechaHora() == null || String.valueOf(evento.getTelefonoContacto()) == null || evento.getLatitud() == null ||
            evento.getLongitud() == null || evento.getLocalizacion() == null || evento.getIntereses() == null)  {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getNombre().length()<10 || evento.getNombre().length() > 100){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getDescripcion().length() <10 || evento.getDescripcion().length() > 500){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getFechaHora().before(new Date())){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (String.valueOf(evento.getTelefonoContacto()).length() != 9){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getLocalizacion().length() < 9 || evento.getLocalizacion().length()>100){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getDetalles().length() < 10 || evento.getDetalles().length() > 200){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
    }
    public void validateModificarEventos(NewEventDTO evento) throws CustomException{
        if (String.valueOf(evento.getEventosId()) == null ||evento.getNombre() == null || evento.getDescripcion() == null || evento.getDetalles() == null ||
                evento.getFechaHora() == null || String.valueOf(evento.getTelefonoContacto()) == null || evento.getLatitud() == null ||
                evento.getLongitud() == null || evento.getLocalizacion() == null || evento.getIntereses() == null)  {
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getNombre().length()<10 || evento.getNombre().length() > 100){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getDescripcion().length() <10 || evento.getDescripcion().length() > 500){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getFechaHora().before(new Date())){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (String.valueOf(evento.getTelefonoContacto()).length() != 9){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getLocalizacion().length() < 9 || evento.getLocalizacion().length()>100){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
        if (evento.getDetalles().length() < 10 || evento.getDetalles().length() > 200){
            throw new CustomException(ErrorCode.ERROR_DATA_FORMAT);
        }
    }
    public void validarImgPortada(Optional<MultipartFile> file) throws CustomException{
        file.ifPresent(f -> {
            String originalFilename = f.getOriginalFilename();
            if (originalFilename != null) {
                String extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1);
                if (!extension.equalsIgnoreCase("png") && !extension.equalsIgnoreCase("jpg")
                        && !extension.equalsIgnoreCase("jpeg")) {
                    try {
                        throw new CustomException(ErrorCode.ERROR_FILE_FAIL);
                    } catch (CustomException e) {
                        throw new RuntimeException(e);
                    }
                }
            }
        });
    }
    public String getExtension(String img){
        int indicePunto = img.lastIndexOf(".");
        return img.substring(indicePunto + 1);
    }
}
