package ceu.student.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.student.api.model.Student;
import java.util.List;
import java.util.Optional;
import java.time.LocalDate;



public interface StudentRepository extends JpaRepository<Student, Long> {
List<Student> findByDniOrEmail(String dni, String email);
List<Student> findAllByOrderByDniAsc();
List<Student> findByDateOfBirthBetweenOrderByDateOfBirthDesc(LocalDate inicio,LocalDate fin);
}
