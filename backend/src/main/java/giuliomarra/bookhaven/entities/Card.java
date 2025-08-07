package giuliomarra.bookhaven.entities;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "cads")
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String cardNumber;
    private LocalDate creationDate;
    private LocalDate expirationDate;

    public Card() {
    }

    public Card(String cardNumber, LocalDate creationDate, LocalDate expirationDate) {
        this.cardNumber = cardNumber;
        this.creationDate = creationDate;
        this.expirationDate = expirationDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(LocalDate expirationDate) {
        this.expirationDate = expirationDate;
    }
}
