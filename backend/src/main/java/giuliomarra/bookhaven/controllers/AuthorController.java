package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.payloads.NewAuthorRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.services.AuthorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    // SOLO STAFF
    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    public ResponseEntity<Author> addAuthor(@RequestBody NewAuthorRequiredDto body) {
        Author author = authorService.addNewAuthor(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(author);
    }

    // VISIBILE A TUTTI
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable Long id) {
        return ResponseEntity.ok(authorService.findAuthorById(id));
    }

    // VISIBILE A TUTTI
    @GetMapping("/all")
    public ResponseEntity<List<Author>> getAllAuthors() {
        return ResponseEntity.ok(authorService.findAllAuthors());
    }

    // VISIBILE A TUTTI
    @GetMapping("/search")
    public ResponseEntity<List<Author>> searchAuthors(@RequestParam String name) {
        return ResponseEntity.ok(authorService.searchAuthorsByName(name));
    }

    // SOLO STAFF
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @RequestBody NewAuthorRequiredDto body) {
        return ResponseEntity.ok(authorService.updateAuthor(id, body));
    }

    // SOLO STAFF
    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/{id}")
    public ResponseEntity<RemoveEntityResponseDto> deleteAuthor(@PathVariable Long id) {
        return ResponseEntity.ok(authorService.removeAuthor(id));
    }
}

