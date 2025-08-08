package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewAuthorRequiredDto;
import giuliomarra.bookhaven.payloads.RemoveEntityResponseDto;
import giuliomarra.bookhaven.repositories.AuthorRepository;
import giuliomarra.bookhaven.repositories.BookAuthorsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookAuthorsRepository bookAuthorsRepository;

    public Author findAuthorById(Long authorId) {
        return authorRepository.findById(authorId).orElseThrow(() -> new EntityNotFoundException("Author with this id " + authorId + " not found"));
    }

    ;

    public Author addNewAuthor(NewAuthorRequiredDto body) {
        if (authorRepository.existsByName(body.name())) {
            throw new AlreadyexistsException("Author " + body.name() + " already exists");
        }

        Author author = new Author(
                body.name(),
                body.dateOfBirth(),
                body.dateOfDeath(),
                body.nationality(),
                body.biography(),
                body.urlImage()
        );

        return authorRepository.save(author);
    }

    ;

    public Author updateAuthor(Long id, NewAuthorRequiredDto body) {
        Author author = findAuthorById(id);

        if (authorRepository.existsByName(body.name())) {
            throw new AlreadyexistsException("Author " + body.name() + " already exists");
        }

        author.setName(body.name());
        author.setDateOfBirth(body.dateOfBirth());
        author.setDateOfDeath(body.dateOfDeath());
        author.setNationality(body.nationality());
        author.setBiography(body.biography());
        author.setUurlImage(body.urlImage());

        return authorRepository.save(author);
    }

    ;

    public RemoveEntityResponseDto removeAuthor(Long id) {
        Author author = findAuthorById(id);

        bookAuthorsRepository.deleteByAuthor(author);

        authorRepository.delete(author);

        return new RemoveEntityResponseDto(
                "Author with ID " + author.getId() + " and name " + author.getName() + " has been removed."
        );
    }


}
