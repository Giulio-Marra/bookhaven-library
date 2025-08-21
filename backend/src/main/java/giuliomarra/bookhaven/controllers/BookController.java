package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.payloads.BookSummaryDto;
import giuliomarra.bookhaven.payloads.NewBookRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.services.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    public ResponseEntity<Book> addBook(@RequestBody NewBookRequiredDto body) {
        Book book = bookService.addNewBook(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody NewBookRequiredDto body) {
        return ResponseEntity.ok(bookService.updateBook(id, body));
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/{id}")
    public ResponseEntity<RemoveEntityResponseDto> deleteBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.removeBook(id));
    }

    @GetMapping("/search")
    public ResponseEntity<List<BookSummaryDto>> searchBooks(@RequestParam String q) {
        return ResponseEntity.ok(bookService.searchBooks(q));
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Book> updateBookStatus(@PathVariable Long id, @RequestParam BookStatus status) {
        return ResponseEntity.ok(bookService.updateBookStatus(id, status));
    }
}

