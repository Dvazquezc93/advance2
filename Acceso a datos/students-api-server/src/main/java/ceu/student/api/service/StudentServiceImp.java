package ceu.student.api.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import ceu.student.api.exception.StudentDuplicateException;
import ceu.student.api.exception.StudentNotFoundException;
import ceu.student.api.model.Student;
import ceu.student.api.repository.StudentRepository;

public class StudentServiceImp implements StudentService {
	@Autowired
	private StudentRepository repoS;

	@Override
	public Student create(Student student) throws StudentDuplicateException {
		if (repoS.findByDniOrEmail(student.getDni(), student.getEmail()).isEmpty()) {
			student.setCreateAt(LocalDateTime.now());
			repoS.save(student);
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
		 return repoS.findById(id).orElseThrow(()-> new StudentNotFoundException("El alumno no existe  con ese id "+id)) ;
		
	}

	@Override
	public List<Student> findAll() throws StudentNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Student> findByAgeRange(Integer minAge, Integer maxAge) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Student> search(FilterDto filter) {
		// TODO Auto-generated method stub
		return null;
	}

}
