package giuliomarra.bookhaven.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UpdateStaffInfoDto(
        @NotBlank
        String identityCode,

        String name,
        String surname,
        
        @Email
        String email,
        @Size(min = 8, max = 20)
        String phoneNumber
) {
}
