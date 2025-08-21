package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {

    boolean existsByName(String name);

    List<Author> findByNameContainingIgnoreCase(String name);
}
