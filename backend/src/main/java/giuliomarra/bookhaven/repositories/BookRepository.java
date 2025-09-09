package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository per gestire i libri (Book).
 */
@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    // Controlla se esiste un libro con un determinato ISBN
    boolean existsByIsbn(String isbn);

    // Restituisce un libro per ISBN
    Optional<Book> findByIsbn(String isbn);

    // Cerca libri che contengono una certa categoria (case insensitive)
    List<Book> findByCategoriesContainingIgnoreCase(String category);

    // Trova libri associati a un autore tramite la tabella di associazione
    @Query("SELECT ba.book FROM BookAuthor ba WHERE ba.author.id = :authorId")
    List<Book> findBooksByAuthorId(@Param("authorId") Long authorId);

    // Ricerca avanzata con filtri su titolo, autore o categoria, paginata
    @Query("""
            SELECT DISTINCT b
            FROM Book b
            LEFT JOIN BookAuthor ba ON ba.book = b
            LEFT JOIN ba.author a
            WHERE (:searchTerm IS NULL OR :searchTerm = '' 
                   OR LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) 
                   OR LOWER(b.isbn) LIKE LOWER(CONCAT('%', :searchTerm, '%')) 
                   OR LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')))
              AND (:category IS NULL OR :category = '' OR LOWER(b.categories) LIKE LOWER(CONCAT('%', :category, '%')))
            """)
    Page<Book> searchBooksByTitleAuthorOrCategory(
            @Param("searchTerm") String searchTerm,
            @Param("category") String category,
            Pageable pageable
    );

    // Restituisce gli ultimi 6 libri aggiunti
    List<Book> findTop6ByOrderByAddingDateDesc();
}
