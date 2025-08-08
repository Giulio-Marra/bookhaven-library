package giuliomarra.bookhaven.entities;

import giuliomarra.bookhaven.enums.BookStatus;
import jakarta.persistence.*;

@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String isbn;

    private String title;
    private String categories;
    private String image;
    private String position;


    @Column(length = 2000)
    private String description;

    private Integer publishedYear;
    private Integer numPages;

    @Enumerated(EnumType.STRING)
    private BookStatus status;
    

    public Book() {
    }

    public Book(String isbn, String title, String categories, String image, String position, String description, Integer publishedYear, Integer numPages, BookStatus status) {
        this.isbn = isbn;
        this.title = title;
        this.categories = categories;
        this.image = image;
        this.position = position;
        this.description = description;
        this.publishedYear = publishedYear;
        this.numPages = numPages;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategories() {
        return categories;
    }

    public void setCategories(String categories) {
        this.categories = categories;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public Integer getNumPages() {
        return numPages;
    }

    public void setNumPages(Integer numPages) {
        this.numPages = numPages;
    }

    public BookStatus getStatus() {
        return status;
    }

    public void setStatus(BookStatus status) {
        this.status = status;
    }
}
