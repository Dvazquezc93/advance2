package ceu.user.api.server.controller;

import ceu.dam.ad.test.users.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ceu.dam.ad.test.users.services.DuplicateUserException;
import ceu.dam.ad.test.users.services.UserException;
import ceu.dam.ad.test.users.services.UserNotFoundException;
import ceu.dam.ad.test.users.services.UserService;
import ceu.dam.ad.test.users.services.UserUnauthorizedException;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RequestMapping("/user")
@RestController
public class UserControler {
	final UserService service;

	UserControler(UserService service) {
		this.service = service;
	}

	@GetMapping("/{id}")
	public User getUser(@PathVariable Long id) throws UserNotFoundException, UserException {
		return service.getUser(id);
	}

	@PostMapping
	public User createrUser(@RequestBody User user) throws DuplicateUserException, UserException {
		return service.createUser(user);
	}

	@PutMapping
	public void changePassword(@RequestParam Long id, @RequestParam String oldPassword,
			@RequestParam String newPassword) throws UserException, UserUnauthorizedException, UserNotFoundException {

		service.changePassword(id, oldPassword, newPassword);

	}
	@GetMapping
	public User login(@RequestParam String login, @RequestParam String password)
			throws UserNotFoundException, UserUnauthorizedException, UserException {
		return service.login(login, password);
	}
}
