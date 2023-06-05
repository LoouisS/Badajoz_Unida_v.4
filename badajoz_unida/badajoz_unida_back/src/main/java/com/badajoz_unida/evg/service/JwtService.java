package com.badajoz_unida.evg.service;

import javax.servlet.http.HttpServletRequest;

public interface JwtService {
    /**
     * Método para la obtención del id registrado en el token de JWT
     * @param request
     * @return
     */
    int getIdFromToken(HttpServletRequest request);

}
