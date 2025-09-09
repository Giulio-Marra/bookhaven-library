package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Reservation;
import giuliomarra.bookhaven.enums.ReservationStatus;
import giuliomarra.bookhaven.payloads.CardReservationDto;
import giuliomarra.bookhaven.payloads.PendingReservationDto;
import giuliomarra.bookhaven.payloads.UserReservationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * Repository per gestire le prenotazioni (Reservation).
 */
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Restituisce prenotazioni filtrate per stato e numero carta, con DTO personalizzato
    @Query("""
                SELECT new giuliomarra.bookhaven.payloads.PendingReservationDto(
                    r.id,
                    r.book.title,
                    r.book.isbn,
                    r.user.name,
                    r.user.taxCode,
                    r.user.card.cardNumber,
                    r.status
                )
                FROM Reservation r
                WHERE (:status IS NULL OR r.status = :status)
                  AND (:cardNumber IS NULL OR r.user.card.cardNumber = :cardNumber)
            """)
    Page<PendingReservationDto> findReservationsByFilters(
            @Param("status") ReservationStatus status,
            @Param("cardNumber") String cardNumber,
            Pageable pageable
    );

    // Restituisce prenotazioni di un utente specifico, ordinate per data, con DTO personalizzato
    @Query("""
                SELECT new giuliomarra.bookhaven.payloads.UserReservationDto(
                    r.id,
                    r.book.title,
                    r.book.isbn,
                    r.reservationDate,
                    r.dueDate,
                    r.status
                )
                FROM Reservation r
                WHERE r.user.id = :userId
                ORDER BY r.reservationDate DESC
            """)
    Page<UserReservationDto> findReservationsByUserId(
            @Param("userId") Long userId,
            Pageable pageable
    );

    // Prenotazioni filtrate per numero carta, stato e se scadute, con DTO personalizzato
    @Query("""
                SELECT new giuliomarra.bookhaven.payloads.CardReservationDto(
                    r.id,
                    r.book.isbn,
                    r.user.card.cardNumber,
                    r.reservationDate,
                    r.dueDate,
                    r.returnDate,
                    r.status
                )
                FROM Reservation r
                WHERE (:cardNumber IS NULL OR r.user.card.cardNumber = :cardNumber)
                  AND (:status IS NULL OR r.status = :status)
                  AND (:expired IS NULL OR (:expired = true AND r.dueDate < CURRENT_DATE))
            """)
    Page<CardReservationDto> findFilteredReservations(
            @Param("cardNumber") String cardNumber,
            @Param("status") ReservationStatus status,
            @Param("expired") Boolean expired,
            Pageable pageable
    );
}
