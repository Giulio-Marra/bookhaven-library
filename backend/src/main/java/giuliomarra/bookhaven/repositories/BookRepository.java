package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.payloads.BookSummaryDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    boolean existsByIsbn(String isbn);

    @Query("SELECT ba.book FROM BookAuthor ba WHERE ba.author.id = :authorId")
    List<Book> findBooksByAuthorId(@Param("authorId") Long authorId);

    @Query("""
                SELECT DISTINCT new giuliomarra.bookhaven.payloads.BookSummaryDto(
                    b.id, b.title, b.image, b.publishedYear, 
                    a.id, a.name
                )
                FROM Book b
                JOIN BookAuthor ba ON ba.book = b
                JOIN ba.author a
                WHERE LOWER(b.title) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
                   OR LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%'))
            """)
    List<BookSummaryDto> searchBooksByTitleOrAuthor(@Param("searchTerm") String searchTerm);


}
