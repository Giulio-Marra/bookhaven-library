package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateUserInfoDto(
        @NotBlank(message = "Name is required")
        @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
        String name,

        @NotBlank(message = "Surname is required")
        @Size(min = 2, max = 50, message = "Surname must be between 2 and 50 characters")
        String surname,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Phone number is required")
        @Size(min = 7, max = 20, message = "Phone number must be between 7 and 20 digits")
        String phoneNumber,

        @NotBlank(message = "Address is required")
        @Size(min = 5, max = 100, message = "Address must be between 5 and 100 characters")
        String address
) {
}
