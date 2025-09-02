package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.BookStatus;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record NewBookRequiredDto(

        @NotEmpty(message = "ISBN must not be empty")
        String isbn,

        @NotEmpty(message = "Title must not be empty")
        String title,

        @NotEmpty(message = "Authors must not be empty")
        List<Long> authorIds,

        @NotEmpty(message = "Categories must not be empty")
        String categories,

        @NotEmpty(message = "Image must not be empty")
        String image,

        @NotEmpty(message = "Position must not be empty")
        String position,

        @NotNull(message = "Status must not be null")
        BookStatus status,

        String description,
        Integer publishedYear,
        Integer numPages


) {
}
