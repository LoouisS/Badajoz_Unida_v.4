package com.badajoz_unida.evg.utils;

import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.exception.ErrorCode;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Date;

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
    public String getExtension(String img){
        int indicePunto = img.lastIndexOf(".");
        return img.substring(indicePunto + 1);
    }
}
