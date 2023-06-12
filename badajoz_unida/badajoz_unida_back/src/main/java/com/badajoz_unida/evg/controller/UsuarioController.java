package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.UpdateRolUserDTO;
import com.badajoz_unida.evg.dto.UserFilter;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.entity.Usuarios;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.service.JwtService;
import com.badajoz_unida.evg.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.token.TokenService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins="http://localhost:4200")
public class UsuarioController {

    @Autowired
    UsuarioService usuarioService;

    @Autowired
    JwtService jwtService;

    /**
     * Endpoint para la obtención de toda la información asociada a un usuario
     * @param request
     * @return
     */
    @GetMapping("/datos")
    public ResponseEntity<?> getDatosUsuarioById(HttpServletRequest request) {
        try {
            int id = this.jwtService.getIdFromToken(request);
            return new ResponseEntity<>(this.usuarioService.getDatosUsuarioById(id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Endpoint para la actualización de la información asociada a un usuario
     * @param request
     * @param usuario
     */
    @PostMapping("/save")
    public void saveUsuarioChanges(HttpServletRequest request, @RequestBody Usuarios usuario) {
        try {
            int id = this.jwtService.getIdFromToken(request);
            this.usuarioService.saveUsuarioChanges(id, usuario);
        } catch (Exception e) {
        }
    }

    /**
     * Endpoint para la actualización de intereses de un usuario
     * @param request
     * @param intereses
     */
    @PutMapping("/saveIntereses")
    public void saveInteresesChanges(HttpServletRequest request, @RequestBody List<Intereses> intereses) {
        try {
            int id = this.jwtService.getIdFromToken(request);
            this.usuarioService.saveInteresesUsuarioChanges(id, intereses);
        } catch (Exception e) {
        }
    }

    /**
     * Endpoint para la obtención de todos los usuarios registrados en la aplicación
     * @param request
     * @return
     */
    @GetMapping("getAll")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
        try {
            return this.usuarioService.getAll();
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para la obtención de todos los usuarios filtrados
     * @param request
     * @param filtro
     * @return
     */
    @PostMapping("getAllFilter")
    public ResponseEntity<?> getAllUsersFilter(HttpServletRequest request, @RequestBody UserFilter filtro) {
        try {
            return this.usuarioService.getAllUsersFilter(filtro);
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Endpoint para la actualización de rol de un usuario
     * @param request
     * @param roluDto
     * @return
     */
    @PostMapping("updateRol")
    public ResponseEntity<?> updateRol(HttpServletRequest request, @RequestBody UpdateRolUserDTO roluDto){
        try{
            return this.usuarioService.updateRol(roluDto);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    /**
     * Endpoint para eliminar un usuario de la aplicación
     * @param id
     * @return
     */
    @DeleteMapping("deleteUser/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") int id){
        return this.usuarioService.deleteUser(id);
    }
}
