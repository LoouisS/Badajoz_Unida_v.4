package com.badajoz_unida.evg.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum ErrorCode {

    CUSTOM_SYSTEM_ERROR(1000,"Ocurrió un problema"),
    ERROR_DATA_FORMAT(1001,"Datos incorrectos"),
    ERROR_LOGIN_FAIL( 1002, "El usuario con el que intentas acceder no existe en nuestro registro"),
    ERROR_EXIST_FAIL( 1003, "Ya existe un registro con esos datos"),
    ERROR_INTERES_FAIL( 1004, "Interés inválido"),
    ERROR_FILE_FAIL( 1005, "Archivo inválido"),
    ERROR_EQUALS_NAME( 1006, "Ya existe un registro con ese nombre");

    private int codigo;
    private String mensaje;
    ErrorCode(int code, String mensaje){
        this.codigo = code;
        this.mensaje = mensaje;
    }
}
