package ceu.user.api.server.Dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
@Data
public class UserResponseDto {
	private String username;
	private String name;
	private String email;
	@Schema(description= "Password sin cifrar")
	private Long Id;
	
}
