package com.badajoz_unida.evg.controller;

import com.badajoz_unida.evg.dto.CatFilter;
import com.badajoz_unida.evg.dto.Mensaje;
import com.badajoz_unida.evg.dto.UserInterestDTO;
import com.badajoz_unida.evg.entity.*;
import com.badajoz_unida.evg.exception.CustomException;
import com.badajoz_unida.evg.security.enums.RolNombre;
import com.badajoz_unida.evg.service.CategoriaService;
import com.badajoz_unida.evg.service.UsuarioInteresesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins="http://localhost:4200")
public class CategoriaController {

    @Autowired
    CategoriaService catService;

    @Autowired
    UsuarioInteresesService usuarioInteresesService;

    /**
     * Endpoint para la obtención de todos los registros de categorías
     * @return
     */
    @GetMapping("/all")
    @PermitAll
    public List<Categorias> getAllCategorias(){

        return this.catService.getAllCategorias();
    }

    /**
     * Endpoint para la obtención de todas las categorías filtradas por los parámetros de búsqueda
     * @param filtro
     * @return
     */
    @PostMapping("/getAllFilter")
    public List<Categorias> getAllFilter(@RequestBody CatFilter filtro){
        return this.catService.getAllCategoriasFilter(filtro);
    }

    /**
     * Endpoint para la obtención de todos los intereses asociados
     * @return
     */
    @GetMapping("/interesesAll")
    @PermitAll
    public List<Intereses> getAllIntereses(){

        return this.catService.getAllIntereses();
    }

    /**
     * Endpoint para el registro de intereses a un usuario
     * @param interesesUsuario
     * @return
     */
    @PostMapping("register/c")
    public ResponseEntity<?> registrarIntereses(@RequestBody UserInterestDTO interesesUsuario){
        return this.usuarioInteresesService.save(interesesUsuario);
    }

    /**
     * Endpoint para la creación de una nueva categoría
     * @param categoria
     * @return
     */
    @PostMapping("registrarCategoria")
    public ResponseEntity<?> registrarCategoria(@RequestBody Categorias categoria, @RequestParam Boolean create){
        try {
            return this.catService.saveCategoria(categoria,create);
        }catch (CustomException e){
            return new ResponseEntity<>(e.getErrorCode().getMensaje(), HttpStatus.CONFLICT);
        }
    }

    /**
     * Endpoint para eliminar un registro de tipo categoría
     * @param request
     * @param catId
     * @return
     */
    @DeleteMapping("eliminarCategoria/{categoriaId}")
    public ResponseEntity<?> eliminarCategoria(HttpServletRequest request, @PathVariable("categoriaId") int catId){
        return this.catService.deleteCategoria(catId);
    }

}
