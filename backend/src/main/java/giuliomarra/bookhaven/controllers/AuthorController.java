package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.payloads.NewAuthorRequiredDto;
import giuliomarra.bookhaven.services.AuthorService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;

    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Author> addNewAuthor(@RequestBody @Valid NewAuthorRequiredDto body) {
        Author author = authorService.addNewAuthor(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(author);
    }
}
