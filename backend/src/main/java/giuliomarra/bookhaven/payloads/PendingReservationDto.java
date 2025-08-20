package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.ReservationStatus;

public record PendingReservationDto(
        Long reservationId,
        String bookTitle,
        String bookIsbn,
        String username,
        String taxCode,
        String cardNumber,
        ReservationStatus status
) {
}
