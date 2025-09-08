package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.ReservationStatus;

import java.time.LocalDate;

public record CardReservationDto(
        Long id,
        String bookIsbn,
        String cardNumber,
        LocalDate reservationDate,
        LocalDate dueDate,
        LocalDate returnDate,
        ReservationStatus status
) {
}
