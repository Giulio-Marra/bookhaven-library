package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.repositories.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    public Author findAuthorById(Long authorId) {
        return authorRepository.findById(authorId).orElseThrow(() -> new EntityNotFoundException("Author with this id " + authorId + " not found"));
    }

    ;

}
