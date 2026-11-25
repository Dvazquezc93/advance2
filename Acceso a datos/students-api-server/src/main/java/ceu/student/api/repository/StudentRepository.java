package ceu.student.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.student.api.model.Student;
import java.util.List;
import java.time.LocalDate;



public interface StudentRepository extends JpaRepository<Student, Long> {
List<Student> findByDniOrEmail(String dni, String email);
List<Student> findAllOrderByDniAsc();
List<Student> findByDateOfBirthBetweenOrderByDateOfBirthAsc(LocalDate inicio,LocalDate fin);
}
