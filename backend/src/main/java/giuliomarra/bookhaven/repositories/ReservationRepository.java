package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Reservation;
import giuliomarra.bookhaven.enums.ReservationStatus;
import giuliomarra.bookhaven.payloads.PendingReservationDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

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
            Pageable pageable);
}
