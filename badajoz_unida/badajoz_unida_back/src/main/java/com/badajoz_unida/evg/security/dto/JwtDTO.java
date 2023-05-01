package com.badajoz_unida.evg.security.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Getter
@Setter
public class JwtDTO {

    private String token;
    public JwtDTO() {
    }


    public JwtDTO(String token) {
        this.token = token;
    }
}
