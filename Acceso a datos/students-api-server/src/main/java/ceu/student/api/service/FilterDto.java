package ceu.student.api.service;

import java.time.LocalDate;

import lombok.Data;
@Data
public class FilterDto {
	private String dni;
	private String firstName;
	private String lastName;
	private String email;
	private LocalDate dateOfBirth;
	private String program;

}
