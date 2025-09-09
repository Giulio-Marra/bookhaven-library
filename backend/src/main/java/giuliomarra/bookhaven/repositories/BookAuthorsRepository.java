package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.BookAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository per la tabella di associazione tra libri e autori.
 */
@Repository
public interface BookAuthorsRepository extends JpaRepository<BookAuthor, Long> {

    // Cancella tutti i collegamenti tra un libro e i suoi autori
    void deleteByBook(Book book);

    // Cancella tutti i collegamenti tra un autore e i suoi libri
    void deleteByAuthor(Author author);
}
