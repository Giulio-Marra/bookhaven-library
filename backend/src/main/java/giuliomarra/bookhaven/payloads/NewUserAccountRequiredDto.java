package giuliomarra.bookhaven.payloads;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;

public record NewUserAccountRequiredDto(

        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Surname is required")
        String surname,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number format")
        String phoneNumber,

        @NotBlank(message = "Address is required")
        String address,

        @NotBlank(message = "Tax code is required")
        @Size(min = 16, max = 16, message = "Tax code must be exactly 16 characters")
        String taxCode,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password,

        @Valid
        @NotNull(message = "Card is required")
        NewCardRequiredDto card

) {
}
