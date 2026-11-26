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
			student.setCreatedAt(LocalDateTime.now());
			return repoS.save(student);
		}
		throw new StudentDuplicateException("That student is already registered in the database");
	}

	@Override
	public void remove(Long id) throws StudentNotFoundException {
		findById(id);
		repoS.deleteById(id);
	}

	@Override
	public Student findById(Long id) throws StudentNotFoundException {
		return repoS.findById(id)
				.orElseThrow(() -> new StudentNotFoundException("The student does not exist with id " + id));
	}

	@Override
	public List<Student> findAll() throws StudentNotFoundException {
		List<Student> students = repoS.findAllByOrderByDniAsc();
		if (students.isEmpty()) {
			throw new StudentNotFoundException("There are no students in the database");
		}
		return students;
	}

	@Override
	public List<Student> findByAgeRange(Integer minAge, Integer maxAge) {
		return repoS.findByDateOfBirthBetweenOrderByDateOfBirthDesc(LocalDate.now().minusYears(maxAge),
				LocalDate.now().minusYears(minAge));
	}

	@Override
	public List<Student> search(FilterDto filter) {
		Student filtered = new ModelMapper().map(filter, Student.class);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase().withStringMatcher(StringMatcher.CONTAINING);
		List<Student> students = repoS.findAll(Example.of(filtered, matcher));
		if (filter.getAge() != null) {
			return students.stream().filter(s -> s.getAge().equals(filter.getAge())).toList();

		}
		return students;
	}

}