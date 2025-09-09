package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.payloads.ListAuthorNameAndIdDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository per gestire gli autori (Author).
 */
@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    // Verifica se esiste un autore con un determinato nome
    boolean existsByName(String name);

    // Cerca autori il cui nome contiene una stringa (case insensitive)
    List<Author> findByNameContainingIgnoreCase(String name);

    // Trova tutti gli autori associati a un determinato libro
    @Query("SELECT ba.author FROM BookAuthor ba WHERE ba.book.id = :bookId")
    List<Author> findAuthorsByBookId(@Param("bookId") Long bookId);

    // Restituisce una lista di DTO contenenti solo id e nome degli autori
    @Query("SELECT new giuliomarra.bookhaven.payloads.ListAuthorNameAndIdDto(a.id, a.name) FROM Author a")
    List<ListAuthorNameAndIdDto> findAllNamesAndIds();

    // Paginazione: cerca autori per nome (case insensitive)
    Page<Author> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
