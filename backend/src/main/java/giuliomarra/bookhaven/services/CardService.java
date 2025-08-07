package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.payloads.NewCardRequiredDto;
import giuliomarra.bookhaven.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CardService {
    @Autowired
    CardRepository cardRepository;

    public Card addNewCard(NewCardRequiredDto body) {
        if (cardRepository.existsByCardNumber(body.cardNumber())) {
            throw new AlreadyexistsException("Card with this cardnumber " + body.cardNumber() + " already exists");
        }
        Card card = new Card(
                body.cardNumber(),
                body.creationDate(),
                body.expirationDate()
        );

        return cardRepository.save(card);
    }
}
