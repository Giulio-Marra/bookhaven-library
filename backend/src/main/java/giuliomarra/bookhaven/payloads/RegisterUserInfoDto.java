package giuliomarra.bookhaven.payloads;

import java.time.LocalDate;

public record RegisterUserInfoDto(
        String cardNumber,
        String password,
        LocalDate creationDate,
        LocalDate expirationDate
) {
}
