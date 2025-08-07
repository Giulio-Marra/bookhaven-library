package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public record NewMemberStaffAccountRequiredDto(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Surname is required")
        String surname,

        @NotBlank(message = "Identity code is required")
        @Size(min = 16, max = 16, message = "Identity code must be exactly 16 characters")
        String identityCode,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        @NotBlank(message = "Phone number is required")
        @Pattern(regexp = "^\\+?[0-9]{7,15}$", message = "Invalid phone number format")
        String phoneNumber,

        @NotBlank(message = "Password is required")
        @Size(min = 8, message = "Password must be at least 8 characters long")
        String password,

        @NotNull(message = "Hire date is required")
        LocalDate hireDate
) {
}
