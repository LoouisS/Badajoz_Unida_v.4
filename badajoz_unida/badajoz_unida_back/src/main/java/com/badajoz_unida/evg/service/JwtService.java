package com.badajoz_unida.evg.service;

import javax.servlet.http.HttpServletRequest;

public interface JwtService {

    int getIdFromToken(HttpServletRequest request);

}
