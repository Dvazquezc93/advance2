package ceu.dam.ad.test.users.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ceu.dam.ad.test.users.model.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User,Long>{

	List<User> findByPassword(String password);
	List<User> findByUsernameAndEmail(String username,String email);
	
	
}
