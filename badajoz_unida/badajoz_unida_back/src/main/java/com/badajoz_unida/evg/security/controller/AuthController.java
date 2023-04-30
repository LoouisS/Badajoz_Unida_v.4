package com.badajoz_unida.evg.security.controller;

import com.badajoz_unida.evg.dto.Mensaje;
import com.badajoz_unida.evg.security.dto.JwtDTO;
import com.badajoz_unida.evg.security.dto.LoginUsuario;
import com.badajoz_unida.evg.security.dto.NuevoUsuario;
import com.badajoz_unida.evg.security.entity.Rol;
import com.badajoz_unida.evg.security.entity.Usuario;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.security.jwt.JwtProvider;
import com.badajoz_unida.evg.security.service.RolService;
import com.badajoz_unida.evg.security.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins="http://localhost:4200")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    RolService rolService;

    @Autowired
    JwtProvider jwtProvider;

    @PostMapping("/register")
    public ResponseEntity<?> nuevo (@Valid @RequestBody NuevoUsuario nuevoUsuario, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity(new Mensaje("Campos erróneos o email inválido"), HttpStatus.BAD_REQUEST);
        if (usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
            return new ResponseEntity(new Mensaje("El nombre de usuario ya existe"),HttpStatus.BAD_REQUEST);
        if(usuarioService.existsByEmail(nuevoUsuario.getEmail()))
            return new ResponseEntity(new Mensaje("El email ya existe"),HttpStatus.BAD_REQUEST);

        Usuario usuario=
                new Usuario(nuevoUsuario.getNombre(),nuevoUsuario.getNombreUsuario(),nuevoUsuario.getEmail(),passwordEncoder.encode(nuevoUsuario.getPassword()));
        Set<Rol> roles=new HashSet<>();
        roles.add(rolService.findByRolNombre(RolNombre.ROLE_USER).get());
        if(nuevoUsuario.getRoles().contains("admin"))
            roles.add(rolService.findByRolNombre(RolNombre.ROLE_ADMIN).get());
        usuario.setRoles(roles);
        usuarioService.save(usuario);
        return new ResponseEntity(new Mensaje("Usuario creado correctamente"),HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<JwtDTO> nuevo (@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult){
        if(bindingResult.hasErrors())
            return new ResponseEntity(new Mensaje("Campos erróneos"), HttpStatus.BAD_REQUEST);

        Authentication authentication=
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                loginUsuario.getNombreUsuario(),loginUsuario.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt=jwtProvider.generateToken(authentication);

        JwtDTO jwtDTO=new JwtDTO(jwt);
        return new ResponseEntity(jwtDTO,HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtDTO> refresh(@RequestBody JwtDTO jwDto)throws ParseException {
        String token=this.jwtProvider.refreshToken(jwDto);
        JwtDTO jwt=new JwtDTO(token);
        return new ResponseEntity(jwt,HttpStatus.OK);
    }
}
