package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.ReservationStatus;

public record BookReservationResponseDto(
        Long id,
        String title,
        String isbn,
        ReservationStatus status,
        String userTaxCode,
        String userCardCode
) {
}
