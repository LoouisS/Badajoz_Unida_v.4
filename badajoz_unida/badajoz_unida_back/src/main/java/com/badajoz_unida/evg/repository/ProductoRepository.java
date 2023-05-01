package com.badajoz_unida.evg.repository;

import com.badajoz_unida.evg.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {
    Optional<Producto> findByNombre(String nombre);
    boolean existsByNombre(String nombre);

    @Modifying
    @Query(value="UPDATE productos p SET p.precio=p.precio+(p.precio*:percent)/100",nativeQuery = true)
    void updatePrecioProductos(@Param("percent")int percent);
}
