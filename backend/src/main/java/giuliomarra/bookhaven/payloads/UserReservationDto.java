package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.ReservationStatus;

import java.time.LocalDate;

public record UserReservationDto(Long reservationId,
                                 String bookTitle,
                                 String bookIsbn,
                                 LocalDate reservationDate,
                                 LocalDate dueDate,
                                 ReservationStatus status) {
}
