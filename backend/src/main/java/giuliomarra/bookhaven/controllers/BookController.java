package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.payloads.BookDetailDto;
import giuliomarra.bookhaven.payloads.NewBookRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.services.BookService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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
    public ResponseEntity<Book> addBook(
            @Valid @RequestPart("data") NewBookRequiredDto body,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException, InterruptedException {
        Book book = bookService.addNewBook(body, imageFile);
        return ResponseEntity.status(HttpStatus.CREATED).body(book);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Book> getBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.findById(id));
    }

    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping(value = "/update/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Book> updateBook(
            @PathVariable Long id,
            @RequestPart("data") NewBookRequiredDto body,
            @RequestPart(value = "image", required = false) MultipartFile imageFile
    ) throws IOException, InterruptedException {
        Book updatedBook = bookService.updateBook(id, body, imageFile);
        return ResponseEntity.ok(updatedBook);
    }


    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<RemoveEntityResponseDto> deleteBook(@PathVariable Long id) {
        return ResponseEntity.ok(bookService.removeBook(id));
    }

    @GetMapping("/public/search")
    public ResponseEntity<Page<BookDetailDto>> searchBooks(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {

        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(bookService.searchBooks(q, category, pageable));
    }


    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Book> updateBookStatus(@PathVariable Long id, @RequestParam BookStatus status) {
        return ResponseEntity.ok(bookService.updateBookStatus(id, status));
    }

    @GetMapping("/public/all")
    public Page<Book> getBooks(@RequestParam(defaultValue = "0") int page,
                               @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return bookService.findBooks(pageable);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<BookDetailDto> getBookDetail(@PathVariable Long id) {
        BookDetailDto bookDetail = bookService.getBookDetail(id);
        return ResponseEntity.ok(bookDetail);
    }

    @GetMapping("/public/author/{authorId}")
    public ResponseEntity<List<Book>> getAllBooksAuthor(@PathVariable Long authorId) {
        List<Book> books = bookService.findBooksByAuthorId(authorId);
        return ResponseEntity.ok(books);
    }

    @GetMapping("/public/recent")
    public ResponseEntity<List<BookDetailDto>> getRecentBooks() {
        List<BookDetailDto> recentBook = bookService.getRecentBooks();
        return ResponseEntity.ok(recentBook);
    }
}

