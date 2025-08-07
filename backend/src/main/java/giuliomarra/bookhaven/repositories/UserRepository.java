package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByCard_CardNumber(String cardNumber);

    boolean existsByTaxCode(String taxCode);

}
