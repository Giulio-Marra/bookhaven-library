package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.enums.ArticleType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record NewArticleRequiredDto(
        @NotBlank(message = "Il titolo non può essere vuoto")
        @Size(max = 255, message = "Il titolo non può superare i 255 caratteri")
        String title,

        @NotNull(message = "Il tipo di articolo è obbligatorio")
        ArticleType articleType,

        @NotBlank(message = "Il contenuto non può essere vuoto")
        @Size(max = 5000, message = "Il contenuto non può superare i 5000 caratteri")
        String content
) {
}
