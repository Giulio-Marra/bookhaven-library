package giuliomarra.bookhaven.entities;

import giuliomarra.bookhaven.enums.Role;
import jakarta.persistence.*;

@Entity
@Table(name = "user_app")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;
    private String surname;
    private String email;
    private String phoneNumber;
    private String address;
    private String taxCode;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "card_id")
    private Card card;

    @ManyToOne
    @JoinColumn(name = "registered_staff_id")
    private Staff registeredBy;

    public User() {
    }

    public User(String name, String surname, String email, String phoneNumber, String address, String taxCode, Role role, Card card, Staff registeredBy) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.taxCode = taxCode;
        this.role = role;
        this.card = card;
        this.registeredBy = registeredBy;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTaxCode() {
        return taxCode;
    }

    public void setTaxCode(String taxCode) {
        this.taxCode = taxCode;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    public Staff getRegisteredBy() {
        return registeredBy;
    }

    public void setRegisteredBy(Staff registeredBy) {
        this.registeredBy = registeredBy;
    }
}
