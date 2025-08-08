package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.NotEmpty;

import java.time.LocalDate;

public record NewAuthorRequiredDto(
        @NotEmpty(message = "Name must not be empty")
        String name,
        LocalDate dateOfBirth,
        LocalDate dateOfDeath,
        String nationality,
        String urlImage,
        String biography
) {
}
