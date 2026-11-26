package ceu.student.api.exception;

import java.time.LocalDate;

import lombok.Data;
@Data
public class FilterDto {
	private String dni;
	private String firstName;
	private String lastName;
	private String email;
	private Integer age;
	private String program;
	private String gender;

}
