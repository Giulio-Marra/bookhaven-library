package giuliomarra.bookhaven.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private LocalDate dateOfBirth;
    private LocalDate dateOfDeath;
    private String nationality;
    private String urlImage;


    @Column(length = 5000)
    private String biography;

    public Author() {
    }

    public Author(String name, LocalDate dateOfBirth, LocalDate dateOfDeath, String nationality, String biography, String urlImage) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.dateOfDeath = dateOfDeath;
        this.nationality = nationality;
        this.biography = biography;
        this.urlImage = urlImage;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public LocalDate getDateOfDeath() {
        return dateOfDeath;
    }

    public void setDateOfDeath(LocalDate dateOfDeath) {
        this.dateOfDeath = dateOfDeath;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUurlImage(String urlImage) {
        this.urlImage = urlImage;
    }
}
