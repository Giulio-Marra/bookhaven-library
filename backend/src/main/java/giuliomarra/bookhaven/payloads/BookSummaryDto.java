package giuliomarra.bookhaven.payloads;

public class BookSummaryDto {
    private Long bookId;
    private String title;
    private String image;
    private Integer publishedYear;
    private Long authorId;
    private String authorName;

    public BookSummaryDto(Long bookId, String title, String image, Integer publishedYear, Long authorId, String authorName) {
        this.bookId = bookId;
        this.title = title;
        this.image = image;
        this.publishedYear = publishedYear;
        this.authorId = authorId;
        this.authorName = authorName;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
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

    public Integer getPublishedYear() {
        return publishedYear;
    }

    public void setPublishedYear(Integer publishedYear) {
        this.publishedYear = publishedYear;
    }

    public Long getAuthorId() {
        return authorId;
    }

    public void setAuthorId(Long authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
