package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Card;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository per gestire le carte degli utenti (Card).
 */
@Repository
public interface CardRepository extends JpaRepository<Card, Long> {

    // Verifica se esiste già una carta con quel numero
    boolean existsByCardNumber(String cardNumber);
}
