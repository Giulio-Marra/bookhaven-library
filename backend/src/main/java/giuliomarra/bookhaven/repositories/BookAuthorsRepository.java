package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.BookAuthor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookAuthorsRepository extends JpaRepository<BookAuthor, Long> {

    void deleteByBook(Book book);

}
