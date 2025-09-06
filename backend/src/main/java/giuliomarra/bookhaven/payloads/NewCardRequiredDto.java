package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record NewCardRequiredDto(
        @NotEmpty(message = "Card number must not be empty")
        String cardNumber,


        LocalDate creationDate,


        LocalDate expirationDate
) {
}
