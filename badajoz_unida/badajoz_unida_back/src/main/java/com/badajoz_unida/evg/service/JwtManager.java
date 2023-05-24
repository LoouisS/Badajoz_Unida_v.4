package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.security.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class JwtManager implements JwtService{

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public int getIdFromToken(HttpServletRequest request) {
        String token = request.getHeader("Authorization");
        if(token != null && token.startsWith("Bearer")){
            token = token.replace("Bearer ", "");
        }
        return Integer.parseInt(this.jwtProvider.getIdFromToken(token));
    }
}
