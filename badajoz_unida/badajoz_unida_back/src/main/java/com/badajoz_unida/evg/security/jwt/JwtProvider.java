package com.badajoz_unida.evg.security.jwt;


import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.badajoz_unida.evg.security.dto.JwtDTO;
import com.badajoz_unida.evg.security.entity.UsuarioPrincipal;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.text.ParseException;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtProvider {
    private final static Logger logger= LoggerFactory.getLogger(JwtProvider.class);

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private int expiration;

    /**
     * Método para la generación de un jwt asociado a un usuario
     * @param authentication
     * @return
     */
    public String generateToken(Authentication authentication){
        UsuarioPrincipal usuarioPrincipal=(UsuarioPrincipal) authentication.getPrincipal();
        List<String> roles= usuarioPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return Jwts.builder()
                .setId(String.valueOf(usuarioPrincipal.getId()))
                .setSubject(usuarioPrincipal.getUsername())
                .claim("nombre", usuarioPrincipal.getNombre())
                .claim("apellidos", usuarioPrincipal.getApellidos())
                .claim("roles",roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+expiration*1000))
                .signWith(SignatureAlgorithm.HS512,secret.getBytes())
                .compact();
    }

    /**
     * Método para la obtención del nombre de usuario registrado en el jwt
     * @param token
     * @return
     */
    public String getNombreUsuarioFromToken(String token){
        return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getSubject();
    }
    /**
     * Método para la obtención del id de usuario registrado en el jwt
     * @param token
     * @return
     */
    public String getIdFromToken(String token){
        return Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token).getBody().getId();
    }

    /**
     * Método para la validación de un jwt siguiendo los parámetros de creación de nuestro jwt
     * @param token
     * @return
     */
    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(token);
            return true;
        }catch(MalformedJwtException e){
            logger.error("token mal formado");
        }catch (UnsupportedJwtException e){
            logger.error("token no soportado");
        }catch(ExpiredJwtException e){
            logger.error("token expirado");
        }catch(IllegalArgumentException e){
            logger.error("token vacío");
        }catch (SignatureException e){
            logger.error("fail en la firma");
        }
        return false;
    }

    /**
     * Método para el refrescado de un jwt de la aplicación
     * @param jwtDTO
     * @return
     * @throws ParseException
     */
    public String refreshToken(JwtDTO jwtDTO) throws  ParseException{
        try {
            Jwts.parser().setSigningKey(secret.getBytes()).parseClaimsJws(jwtDTO.getToken());

        }catch(ExpiredJwtException e){
            JWT jwt = JWTParser.parse(jwtDTO.getToken());
            JWTClaimsSet claims=jwt.getJWTClaimsSet();
            String nombreUsuario=claims.getSubject();
            List<String> roles=(List<String>) claims.getClaim("roles");
            return Jwts.builder()
                    .setSubject(nombreUsuario)
                    .claim("roles",roles)
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(new Date().getTime()+expiration*1000))
                    .signWith(SignatureAlgorithm.HS512,secret.getBytes())
                    .compact();
        }
        return null;

    }
}
