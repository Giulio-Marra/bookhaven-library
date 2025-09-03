package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.payloads.ListAuthorNameAndIdDto;
import giuliomarra.bookhaven.payloads.NewAuthorRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.services.AuthorService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Author> addAuthor(@Valid @RequestBody NewAuthorRequiredDto body) {
        Author author = authorService.addNewAuthor(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(author);
    }

    // VISIBILE A TUTTI
    @GetMapping("/public/{id}")
    public ResponseEntity<Author> getAuthor(@PathVariable Long id) {
        return ResponseEntity.ok(authorService.findAuthorById(id));
    }

    // VISIBILE A TUTTI
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/all")
    public ResponseEntity<List<Author>> getAllAuthors() {
        return ResponseEntity.ok(authorService.findAllAuthors());
    }

    // SOLO STAFF
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/update/{id}")
    public ResponseEntity<Author> updateAuthor(@PathVariable Long id, @Valid @RequestBody NewAuthorRequiredDto body) {
        return ResponseEntity.ok(authorService.updateAuthor(id, body));
    }

    // SOLO STAFF
    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RemoveEntityResponseDto> deleteAuthor(@PathVariable Long id) {
        return ResponseEntity.ok(authorService.removeAuthor(id));
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/names")
    public ResponseEntity<List<ListAuthorNameAndIdDto>> getAllAuthorsNamesAndIds() {
        return ResponseEntity.ok(authorService.getAllAuthorsNamesAndIds());
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Author>> searchAuthors(
            @RequestParam String name,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(authorService.searchAuthorsByName(name, pageable));
    }

}

