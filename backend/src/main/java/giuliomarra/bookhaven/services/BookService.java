package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.BookAuthor;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.BookDetailDto;
import giuliomarra.bookhaven.payloads.NewBookRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.repositories.BookAuthorsRepository;
import giuliomarra.bookhaven.repositories.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final BookAuthorsRepository bookAuthorsRepository;
    private final AuthorService authorService;
    private final SupabaseStorageService supabaseStorageService;

    public BookService(BookRepository bookRepository, BookAuthorsRepository bookAuthorsRepository, AuthorService authorService, SupabaseStorageService supabaseStorageService) {
        this.bookRepository = bookRepository;
        this.bookAuthorsRepository = bookAuthorsRepository;
        this.authorService = authorService;
        this.supabaseStorageService = supabaseStorageService;
    }

    public Book findById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book with this id " + id + " not found"));
    }

    public List<Book> findAllBooks() {
        return bookRepository.findAll();
    }

    public Book findByIsbn(String isbn) {
        return bookRepository.findByIsbn(isbn)
                .orElseThrow(() -> new EntityNotFoundException("Book with ISBN " + isbn + " not found"));
    }

    public List<Book> findByCategory(String category) {
        return bookRepository.findByCategoriesContainingIgnoreCase(category);
    }

    public Book addNewBook(NewBookRequiredDto body, MultipartFile imageFile) throws IOException, InterruptedException {
        String imageUrl = null;
        if (imageFile != null) {
            imageUrl = supabaseStorageService.uploadFile(imageFile);
        }

        Book book = new Book(
                body.isbn(),
                body.title(),
                body.categories(),
                imageUrl,
                body.position(),
                body.description(),
                body.publishedYear(),
                body.numPages(),
                BookStatus.AVAILABLE
        );

        book = bookRepository.save(book);

        for (Long authorId : body.authorIds()) {
            Author author = authorService.findAuthorById(authorId);
            BookAuthor bookAuthor = new BookAuthor(book, author);
            bookAuthorsRepository.save(bookAuthor);
        }

        return book;
    }

    public Book updateBook(Long id, NewBookRequiredDto body) {
        Book book = findById(id);

        book.setIsbn(body.isbn());
        book.setTitle(body.title());
        book.setCategories(body.categories());
        book.setImage(body.image());
        book.setPosition(body.position());
        book.setDescription(body.description());
        book.setPublishedYear(body.publishedYear());
        book.setNumPages(body.numPages());
        book.setStatus(BookStatus.AVAILABLE);

        book = bookRepository.save(book);

        bookAuthorsRepository.deleteByBook(book);

        for (Long authorId : body.authorIds()) {
            Author author = authorService.findAuthorById(authorId);
            BookAuthor bookAuthor = new BookAuthor(book, author);
            bookAuthorsRepository.save(bookAuthor);
        }

        return book;
    }

    public RemoveEntityResponseDto removeBook(Long id) {
        Book book = findById(id);

        bookAuthorsRepository.deleteByBook(book);
        bookRepository.delete(book);

        return new RemoveEntityResponseDto(
                "Book with ID " + book.getId() +
                        " and ISBN " + book.getIsbn() +
                        " has been removed from the database."
        );
    }

    public List<Book> findBooksByAuthorId(Long authorId) {
        return bookRepository.findBooksByAuthorId(authorId);
    }

    public Page<BookDetailDto> searchBooks(String searchTerm, Pageable pageable) {
        Page<Book> books = bookRepository.searchBooksByTitleOrAuthor(searchTerm, pageable);

        return books.map(book -> {
            List<Author> authors = authorService.getAuthorsByBookId(book.getId());
            return new BookDetailDto(
                    book.getId(),
                    book.getTitle(),
                    book.getImage(),
                    book.getIsbn(),
                    book.getNumPages(),
                    book.getPosition(),
                    book.getPublishedYear(),
                    book.getStatus(),
                    book.getDescription(),
                    book.getCategories(),
                    authors
            );
        });
    }


    public Book updateBookStatus(Long id, BookStatus status) {
        Book book = findById(id);
        book.setStatus(status);
        return bookRepository.save(book);
    }

    public Page<Book> findBooks(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    public BookDetailDto getBookDetail(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        List<Author> authors = authorService.getAuthorsByBookId(bookId);

        return new BookDetailDto(
                book.getId(),
                book.getTitle(),
                book.getImage(),
                book.getIsbn(),
                book.getNumPages(),
                book.getPosition(),
                book.getPublishedYear(),
                book.getStatus(),
                book.getDescription(),
                book.getCategories(),
                authors
        );
    }


}
