package ceu.dam.ad.orm.practicas.biblioteca.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.orm.practicas.biblioteca.model.Prestamo;
import ceu.dam.ad.orm.practicas.biblioteca.model.PrestamoKey;
import java.util.Optional;



public interface PrestamoRepository extends JpaRepository<Prestamo, PrestamoKey > {
Optional<Prestamo> findFirstByAnioOrderByNumPrestamoDesc(Integer anio);
}
