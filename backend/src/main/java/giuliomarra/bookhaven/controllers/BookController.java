package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.payloads.BookSummaryDto;
import giuliomarra.bookhaven.payloads.NewBookRequiredDto;
import giuliomarra.bookhaven.services.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book")
public class BookController {
    @Autowired
    private BookService bookService;

    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Book> addNewBook(@RequestBody @Valid NewBookRequiredDto body) {
        Book book = bookService.addNewBook(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Book>> getBooksByAuthorId(@PathVariable Long authorId) {
        List<Book> books = bookService.findBooksByAuthorId(authorId);
        return ResponseEntity.ok(books);
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/search")
    public ResponseEntity<List<BookSummaryDto>> searchBooks(@RequestParam String q) {
        List<BookSummaryDto> results = bookService.searchBooks(q);
        return ResponseEntity.ok(results);
    }
}
