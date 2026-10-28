package ceu.user.api.server.controller;

import ceu.dam.ad.test.users.model.User;

import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ceu.dam.ad.test.users.services.DuplicateUserException;
import ceu.dam.ad.test.users.services.UserException;
import ceu.dam.ad.test.users.services.UserNotFoundException;
import ceu.dam.ad.test.users.services.UserService;
import ceu.dam.ad.test.users.services.UserUnauthorizedException;
import ceu.user.api.server.Dto.request.ChangeRequestDto;
import ceu.user.api.server.Dto.request.LoginRequestDto;
import ceu.user.api.server.Dto.request.UserCreateRequestDto;
import ceu.user.api.server.Dto.response.UserResponseDto;
import io.swagger.v3.oas.annotations.Operation;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequestMapping("/user")
@RestController
public class UserControler {
	final UserService service;
	private final  ModelMapper mapper;

	UserControler(UserService service) {
		this.service = service;
		this.mapper = new ModelMapper();
	}

	@GetMapping("/{id}")
	public UserResponseDto getUser(@PathVariable Long id) throws UserNotFoundException, UserException {
		return mapper.map(service.getUser(id),UserResponseDto.class);
	}

	@PostMapping
	public UserResponseDto createrUser(@RequestBody UserCreateRequestDto user) throws DuplicateUserException, UserException {
		return mapper.map(service.createUser(mapper.map(user, User.class)), UserResponseDto.class);
	}
	@Operation(summary ="cambio de contraseña",description ="Permite cambiar la contraseña de un usuario")
	@PutMapping("/{id}")
	public void changePassword(@PathVariable Long id, @RequestBody ChangeRequestDto request ) throws UserException, UserUnauthorizedException, UserNotFoundException {
		service.changePassword(id, request.getOldPassword(), request.getNewPassword());

	}
	
	@PostMapping("/login") // login post por seguridad
	public UserResponseDto login(@RequestBody LoginRequestDto request)
			throws UserNotFoundException, UserUnauthorizedException, UserException {
		return mapper.map(service.login(request.getLogin(),request.getPassword()),UserResponseDto.class);
	}
}
