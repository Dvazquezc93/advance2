package ceu.student.api.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;

import ceu.student.api.exception.FilterDto;
import ceu.student.api.exception.StudentDuplicateException;
import ceu.student.api.exception.StudentNotFoundException;
import ceu.student.api.model.Student;
import ceu.student.api.repository.StudentRepository;
@Service
public class StudentServiceImp implements StudentService {
	@Autowired
	private StudentRepository repoS;

	@Override
	public Student create(Student student) throws StudentDuplicateException {
		if (repoS.findByDniOrEmail(student.getDni(), student.getEmail()).isEmpty()) {
			student.setCreateAt(LocalDateTime.now());
			return repoS.save(student);
		}
		throw new StudentDuplicateException("Ese estudiante ya esta en la base de datos registrado");
	}

	@Override
	public void remove(Long id) throws StudentNotFoundException {
		findById(id);
		repoS.deleteById(id);

	}

	@Override
	public Student findById(Long id) throws StudentNotFoundException {
		return repoS.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("El alumno no existe  con ese id " + id));

	}

	@Override
	public List<Student> findAll() throws StudentNotFoundException {
		List<Student> students = repoS.findAllOrderByDniAsc();
		if (students.isEmpty()) {
			throw new StudentNotFoundException("No hay estudiantes en la base de datos");
		}
		return students;
	}

	@Override
	public List<Student> findByAgeRange(Integer minAge, Integer maxAge) {
		return repoS.findByDateOfBirthBetweenOrderByDateOfBirthAsc(LocalDate.now().minusYears(maxAge),
				LocalDate.now().minusYears(minAge));
	}

	@Override
	public List<Student> search(FilterDto filter) {
		Student filtrado = new ModelMapper().map(filter, Student.class);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING);
		return repoS.findAll(Example.of(filtrado, matcher));
	}

}
