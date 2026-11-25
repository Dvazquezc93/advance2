package ceu.student.api.service;

import java.util.List;

import ceu.student.api.exception.StudentDuplicateException;
import ceu.student.api.exception.StudentNotFoundException;
import ceu.student.api.model.Student;

public interface StudentService {
	Student create(Student student) throws StudentDuplicateException;

	void remove(Long id) throws StudentNotFoundException;

	Student findById(Long id) throws StudentNotFoundException;

	List<Student> findAll() throws StudentNotFoundException;

	List<Student> findByAgeRange(Integer minAge, Integer maxAge);

	List<Student> search(FilterDto filter);
}