package giuliomarra.bookhaven.payloads;

import giuliomarra.bookhaven.entities.Author;
import giuliomarra.bookhaven.enums.BookStatus;

import java.util.List;

public class BookDetailDto {

    private Long id;
    private String title;
    private String image;
    private String isbn;
    private Integer numPages;
    private String position;
    private Integer publishedYear;
    private BookStatus status;
    private String description;
    private String categories;
    private List<Author> authors;

    public BookDetailDto(Long id, String title, String image, String isbn, Integer numPages, String position, Integer publishedYear, BookStatus status, String description, String categories, List<Author> authors) {
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

    public Integer getNumPages() {
        return numPages;
    }

    public void setNumPages(Integer numPages) {
        this.numPages = numPages;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
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
