package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.BookAuthor;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.BookSummaryDto;
import giuliomarra.bookhaven.payloads.NewBookRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.repositories.BookAuthorsRepository;
import giuliomarra.bookhaven.repositories.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookAuthorsRepository bookAuthorsRepository;

    @Autowired
    private AuthorService authorService;

    public Book findById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book with this id " + id + " not found"));
    }

    public Book addNewBook(NewBookRequiredDto body) {

        Book book = new Book(
                body.isbn(),
                body.title(),
                body.categories(),
                body.image(),
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

    public List<BookSummaryDto> searchBooks(String searchTerm) {
        return bookRepository.searchBooksByTitleOrAuthor(searchTerm);
    }

    public Book updateBookStatus(Long id, BookStatus status) {
        Book book = findById(id);
        book.setStatus(status);
        return bookRepository.save(book);
    }


}
