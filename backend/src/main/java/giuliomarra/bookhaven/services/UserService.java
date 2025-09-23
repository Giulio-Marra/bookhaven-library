package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewCardRequiredDto;
import giuliomarra.bookhaven.payloads.NewUserAccountRequiredDto;
import giuliomarra.bookhaven.payloads.RegisterUserInfoDto;
import giuliomarra.bookhaven.payloads.UpdateUserInfoDto;
import giuliomarra.bookhaven.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final CardService cardService;
    private final PasswordEncoder bcrypt;
    private final EmailService emailService;

    public UserService(UserRepository userRepository, CardService cardService, PasswordEncoder bcrypt, EmailService emailService) {
        this.userRepository = userRepository;
        this.cardService = cardService;
        this.bcrypt = bcrypt;
        this.emailService = emailService;
    }

    // Genera password casuale
    public String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            password.append(chars.charAt(random.nextInt(chars.length())));
        }
        return password.toString();
    }

    // Trova utente per ID
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with id " + id + " not found"));
    }

    // Trova utente per card
    public User findUserByCardCode(String cardCode) {
        return userRepository.findByCard_CardNumber(cardCode)
                .orElseThrow(() -> new EntityNotFoundException("User with card code " + cardCode + " not found"));
    }

    // Trova utente per email
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email " + email + " not found"));
    }

    // Recupera tutti gli utenti
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // Crea nuovo account utente e invia email
    public RegisterUserInfoDto createNewUserAccount(NewUserAccountRequiredDto body, Staff registeredBy) {
        validateUserUniqueness(body.email(), body.taxCode());
        Card card = cardService.addNewCard(body.card());
        String rawPassword = generateRandomPassword(12);

        User user = new User(
                body.name(),
                body.surname(),
                body.email(),
                body.phoneNumber(),
                body.address(),
                body.taxCode(),
                Role.USER,
                card,
                registeredBy,
                bcrypt.encode(rawPassword)
        );

        userRepository.save(user);
        emailService.sendRegistrationEmail(user.getEmail(), card.getCardNumber(), rawPassword);

        return new RegisterUserInfoDto(
                card.getCardNumber(),
                rawPassword,
                card.getCreationDate(),
                card.getExpirationDate()
        );
    }

    // Controlla unicita di email e codice fiscale
    private void validateUserUniqueness(String email, String taxCode) {
        if (userRepository.existsByTaxCode(taxCode)) {
            throw new AlreadyexistsException("User with taxCode " + taxCode + " already exists");
        }
    }

    // Cerca utenti per email, codice fiscale o card
    public Page<User> searchUsers(String search, int page, int size) {
        return userRepository.searchByEmailOrTaxCodeOrCardNumber(search, PageRequest.of(page, size));
    }

    // Aggiorna informazioni utente
    public User updateUserInfo(User user, UpdateUserInfoDto dto) {
        if (!user.getEmail().equals(dto.email()) && userRepository.findByEmail(dto.email()).isPresent()) {
            throw new AlreadyexistsException("Email " + dto.email() + " is already used by another user");
        }

        user.setName(dto.name());
        user.setSurname(dto.surname());
        user.setEmail(dto.email());
        user.setPhoneNumber(dto.phoneNumber());
        user.setAddress(dto.address());

        return userRepository.save(user);
    }

    // Aggiorna password utente
    public void updateUserPassword(User user, String rawPassword) {
        user.setPassword(bcrypt.encode(rawPassword));
        userRepository.save(user);
    }

    // Resetta password e restituisce la nuova
    public String resetUserPassword(Long id) {
        User user = findUserById(id);
        String newRawPassword = generateRandomPassword(8);
        user.setPassword(bcrypt.encode(newRawPassword));
        userRepository.save(user);
        return newRawPassword;
    }

    // Assegna nuova card a utente
    public User assignNewCardToUser(Long id, NewCardRequiredDto dto) {
        User user = findUserById(id);
        Card newCard = cardService.addNewCard(dto);
        user.setCard(newCard);
        return userRepository.save(user);
    }

    // Rinnova card utente
    public User renewUserCard(Long userId) {
        User user = findUserById(userId);
        Card updatedCard = cardService.updateCardExpiration(user.getCard().getId());
        user.setCard(updatedCard);
        return userRepository.save(user);
    }

    // Elimina utente
    public void deleteUser(Long id) {
        User user = findUserById(id);
        userRepository.delete(user);
    }
}
