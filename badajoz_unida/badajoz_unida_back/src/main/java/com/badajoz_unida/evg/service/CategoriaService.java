package com.badajoz_unida.evg.service;

import com.badajoz_unida.evg.dto.CatFilter;
import com.badajoz_unida.evg.entity.Categorias;
import com.badajoz_unida.evg.entity.Intereses;
import com.badajoz_unida.evg.exception.CustomException;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CategoriaService {
    /**
     * Método para la obtención de todas las categorías registradas en la aplicación
     * @return
     */
    List<Categorias> getAllCategorias();

    /**
     * Método para la obtención de todos los intereses registrados en la aplicación
     * @return
     */
    List<Intereses> getAllIntereses();

    /**
     * Método para guardar un nuevo registro de tipo Categorias
     * @param categoria
     * @return
     * @throws CustomException
     */
    ResponseEntity<?> saveCategoria(Categorias categoria) throws CustomException;

    /**
     * Método para borrar un registro de Categorias a través de su id
     * @param catId
     * @return
     */
    ResponseEntity<?> deleteCategoria(int catId);

    /**
     * Método para la obtención de categorias filtradas
     * @param filtro
     * @return
     */
    List<Categorias> getAllCategoriasFilter(CatFilter filtro);
}
