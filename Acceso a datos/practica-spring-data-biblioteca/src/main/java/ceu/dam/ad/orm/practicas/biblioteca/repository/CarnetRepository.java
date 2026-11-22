package ceu.dam.ad.orm.practicas.biblioteca.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.orm.practicas.biblioteca.model.Carnet;

public interface CarnetRepository extends JpaRepository<Carnet, UUID> {

}
