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

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    boolean existsByIsbn(String isbn);

    Optional<Book> findByIsbn(String isbn);

    List<Book> findByCategoriesContainingIgnoreCase(String category);

    @Query("SELECT ba.book FROM BookAuthor ba WHERE ba.author.id = :authorId")
    List<Book> findBooksByAuthorId(@Param("authorId") Long authorId);

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
            Pageable pageable);


    List<Book> findTop6ByOrderByAddingDateDesc();


}
