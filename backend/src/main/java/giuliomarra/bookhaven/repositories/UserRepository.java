package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Trova un utente per numero di carta
    Optional<User> findByCard_CardNumber(String cardNumber);

    // Controlla se esiste già un utente con un certo codice fiscale
    boolean existsByTaxCode(String taxCode);

    // Trova un utente per email
    Optional<User> findByEmail(String email);

    // Ricerca utenti per email, codice fiscale o numero carta, paginata
    @Query("SELECT u FROM User u " +
            "WHERE LOWER(u.email) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(u.taxCode) LIKE LOWER(CONCAT('%', :search, '%')) " +
            "OR LOWER(u.card.cardNumber) LIKE LOWER(CONCAT('%', :search, '%'))")
    Page<User> searchByEmailOrTaxCodeOrCardNumber(@Param("search") String search, Pageable pageable);
}
