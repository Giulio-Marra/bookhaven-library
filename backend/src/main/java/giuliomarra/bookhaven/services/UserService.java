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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CardService cardService;

    @Autowired
    private PasswordEncoder bcrypt;


    // ---------------------------
    // PASSWORD UTILS
    // ---------------------------
    // generazione password randomica
    public String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{};:,.<>?";
        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder(8);

        for (int i = 0; i < 8; i++) {
            int index = random.nextInt(chars.length());
            password.append(chars.charAt(index));
        }

        return password.toString();
    }

    // ---------------------------
    // READ
    // ---------------------------
    public User findUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User with this id " + id + " not found"));
    }

    public User findUserByCardCode(String cardCode) {
        return userRepository.findByCard_CardNumber(cardCode)
                .orElseThrow(() -> new EntityNotFoundException("User with card code " + cardCode + " not found"));
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("User with email " + email + " not found"));
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    // ---------------------------
    // CREATE
    // ---------------------------
    public RegisterUserInfoDto createNewUserAccount(NewUserAccountRequiredDto body, Staff registeredBy) {
        if (userRepository.existsByTaxCode(body.taxCode())) {
            throw new AlreadyexistsException("User with this taxCode " + body.taxCode() + " already exist");
        }
        if (userRepository.findByEmail(body.email()).isPresent()) {
            throw new AlreadyexistsException("User with this email " + body.email() + " already exist");
        }
        Card card = cardService.addNewCard(body.card());

        String rawPassword = generateRandomPassword();

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

        return new RegisterUserInfoDto(
                card.getCardNumber(),
                rawPassword,
                card.getCreationDate(),
                card.getExpirationDate()
        );
    }

    // ---------------------------
    // UPDATE
    // ---------------------------
    // versione con id (admin/staff)
    public User updateUserInfo(User user, UpdateUserInfoDto dto) {
        user.setName(dto.name());
        user.setSurname(dto.surname());
        user.setEmail(dto.email());
        user.setPhoneNumber(dto.phoneNumber());
        user.setAddress(dto.address());
        return userRepository.save(user);
    }


    // cambio password esplicito
    public void updateUserPassword(User user, String rawPassword) {
        user.setPassword(bcrypt.encode(rawPassword));
        userRepository.save(user);
    }

    // reset password (per admin/staff)
    public String resetUserPassword(Long id) {
        User user = findUserById(id);
        String newRawPassword = generateRandomPassword();
        user.setPassword(bcrypt.encode(newRawPassword));
        userRepository.save(user);
        return newRawPassword;
    }


    // gestione card (nuova card per utente)
    public User assignNewCardToUser(Long id, NewCardRequiredDto dto) {
        User user = findUserById(id);
        Card newCard = cardService.addNewCard(dto);
        user.setCard(newCard);
        return userRepository.save(user);
    }

    // rinnovo della card
    public User renewUserCard(Long userId) {
        User user = findUserById(userId);

        Card updatedCard = cardService.updateCardExpiration(user.getCard().getId());

        user.setCard(updatedCard);
        return userRepository.save(user);
    }


    // ---------------------------
    // DELETE
    // ---------------------------
    public void deleteUser(Long id) {
        User user = findUserById(id);
        userRepository.delete(user);
    }
}

