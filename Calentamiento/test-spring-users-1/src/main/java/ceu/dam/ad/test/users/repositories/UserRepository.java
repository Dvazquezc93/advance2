package ceu.dam.ad.test.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.test.users.model.User;
import java.util.List;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User,Long>{

	List<User> findByPassword(String password);
	Optional<User> findByUsernameAndEmail(String username,String email);
	Optional<User> findByUsernameOrEmail(String username,String email);
	
	
	
}
