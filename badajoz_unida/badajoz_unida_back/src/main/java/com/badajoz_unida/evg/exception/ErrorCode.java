package com.badajoz_unida.evg.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
public enum ErrorCode {
    ERROR_DATA_FORMAT(1001,"Datos incorrectos"),
    ERROR_LOGIN_FAIL( 1002, "El usuario con el que intentas acceder no existe en nuestro registro");

    private int codigo;
    private String mensaje;
    ErrorCode(int code, String mensaje){
        this.codigo = code;
        this.mensaje = mensaje;
    }

}
