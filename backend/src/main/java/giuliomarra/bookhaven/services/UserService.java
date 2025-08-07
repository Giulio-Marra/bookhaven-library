package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewUserAccountRequiredDto;
import giuliomarra.bookhaven.payloads.RegisterUserInfoDto;
import giuliomarra.bookhaven.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CardService cardService;

    @Autowired
    private PasswordEncoder bcrypt;

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

    public User findUserById(Long id) {
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new EntityNotFoundException("User with this id " + id + " not found");
        }
    }

    public User findUserByCardCode(String cardCode) {
        return userRepository.findByCard_CardNumber(cardCode)
                .orElseThrow(() -> new EntityNotFoundException("User with card code " + cardCode + " not found"));
    }

    public RegisterUserInfoDto createNewUserAccount(NewUserAccountRequiredDto body, Staff registeredBy) {
        if (userRepository.existsByTaxCode(body.taxCode())) {
            throw new AlreadyexistsException("User with this taxCode " + body.taxCode() + " already exist");
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

}
