package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record NewCardRequiredDto(
        @NotEmpty(message = "Card number must not be empty")
        String cardNumber,

        @NotNull(message = "Creation date must not be null")
        LocalDate creationDate,

        @NotNull(message = "Expiration date must not be null")
        LocalDate expirationDate
) {
}
