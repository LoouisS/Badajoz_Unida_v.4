package com.badajoz_unida.evg.security.controller;

import com.badajoz_unida.evg.dto.Mensaje;
import com.badajoz_unida.evg.dto.UserInterestDTO;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Roles;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.exception.ErrorCode;
import com.badajoz_unida.evg.security.dto.JwtDTO;
import com.badajoz_unida.evg.security.dto.LoginUsuario;
import com.badajoz_unida.evg.security.dto.NuevoUsuario;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.security.jwt.JwtProvider;
import com.badajoz_unida.evg.security.service.RolService;
import com.badajoz_unida.evg.security.service.UsuarioService;
import com.badajoz_unida.evg.service.CategoriaService;
import com.badajoz_unida.evg.service.UsuarioInteresesService;
import com.badajoz_unida.evg.utils.JavaUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.ArrayList;
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
    UsuarioInteresesService usuarioInteresesService;

    @Autowired
    JwtProvider jwtProvider;


    JavaUtils utils = new JavaUtils();

    /**
     * Endpoint para el registro de un nuevo usuario en la aplicación
     * @param nuevoUsuario
     * @param bindingResult
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<?> nuevo (@Valid @RequestBody Usuarios nuevoUsuario, BindingResult bindingResult){
        try{
            this.utils.validateRegister(nuevoUsuario);
            if(bindingResult.hasErrors())
                return new ResponseEntity(new Mensaje("Campos erróneos o email inválido"), HttpStatus.BAD_REQUEST);
            if (usuarioService.existsByNombreUsuario(nuevoUsuario.getNombreUsuario()))
                return new ResponseEntity(new Mensaje("El nombre de usuario ya existe"),HttpStatus.BAD_REQUEST);
            if(usuarioService.existsByEmail(nuevoUsuario.getEmail()))
                return new ResponseEntity(new Mensaje("El email ya existe"),HttpStatus.BAD_REQUEST);
            Usuarios usuario =
                    new Usuarios(nuevoUsuario.getNombre(),nuevoUsuario.getApellidos(),nuevoUsuario.getEmail(),passwordEncoder.encode(nuevoUsuario.getPassword()),nuevoUsuario.getNombreUsuario(),nuevoUsuario.getFchNacimiento(),nuevoUsuario.getTlf(), nuevoUsuario.getIdioma() );
            Set<Roles> roles=new HashSet<>();
            roles.add(rolService.findByTitulo(RolNombre.ROLE_USER).get());
            if(nuevoUsuario.getRoles().contains("admin"))
                roles.add(rolService.findByTitulo(RolNombre.ROLE_ADMIN).get());
            usuario.setRoles(roles);
            usuarioService.save(usuario);
            UserInterestDTO intereses = new UserInterestDTO();
            intereses.setUsuarioId(usuario.getUserId());
            intereses.setIntereses(nuevoUsuario.getIntereses());
            usuarioInteresesService.save(intereses);
            return new ResponseEntity(new Mensaje("Usuario creado correctamente"),HttpStatus.CREATED);
        }catch (CustomException e){
            return new ResponseEntity(new CustomException(ErrorCode.ERROR_LOGIN_FAIL).getErrorCode().getMensaje(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Método para el inicio de sesión en la aplicación, generá el jwt necesario para navegar en la aplicación
     * @param loginUsuario
     * @param bindingResult
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<?> nuevo (@Valid @RequestBody LoginUsuario loginUsuario, BindingResult bindingResult){
        try {
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
        }catch (AuthenticationException e){
            return new ResponseEntity(new CustomException(ErrorCode.ERROR_LOGIN_FAIL).getErrorCode().getMensaje(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Endpoint para el refrescado del token asociado a un usuario en la aplicación
     * @param jwDto
     * @return
     * @throws ParseException
     */
    @PostMapping("/refresh")
    public ResponseEntity<JwtDTO> refresh(@RequestBody JwtDTO jwDto)throws ParseException {
        String token=this.jwtProvider.refreshToken(jwDto);
        JwtDTO jwt=new JwtDTO(token);
        return new ResponseEntity(jwt,HttpStatus.OK);
    }
}
