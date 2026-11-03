package ceu.user.api.server.Dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
@Data
public class UserCreateRequestDto {
	@NotBlank
private String username;
	@NotBlank
private String name;
	@NotBlank
	@Email
private String email;
	@NotBlank
@Schema(description= "Password sin cifrar")
private String password;


}
