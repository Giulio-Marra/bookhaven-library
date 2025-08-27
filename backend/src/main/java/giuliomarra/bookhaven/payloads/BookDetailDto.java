package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.enums.BookStatus;

import java.util.List;

public class BookDetailDto {

    private Long id;
    private String title;
    private String image;
    private String isbn;
    private int numPages;
    private String position;
    private int publishedYear;
    private BookStatus status;
    private String description;
    private String categories;
    private List<Author> authors;

    public BookDetailDto(Long id, String title, String image, String isbn, int numPages, String position, int publishedYear, BookStatus status, String description, String categories, List<Author> authors) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.isbn = isbn;
        this.numPages = numPages;
        this.position = position;
        this.publishedYear = publishedYear;
        this.status = status;
        this.description = description;
        this.categories = categories;
        this.authors = authors;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public int getNumPages() {
        return numPages;
    }

    public void setNumPages(int numPages) {
        this.numPages = numPages;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public int getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(int publishedYear) {
        this.publishedYear = publishedYear;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> authors) {
        this.authors = authors;
    }
}
