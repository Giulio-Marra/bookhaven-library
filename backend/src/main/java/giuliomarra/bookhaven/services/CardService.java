package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
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

    public Card findCardById(Long idCard) {
        return cardRepository.findById(idCard)
                .orElseThrow(() -> new EntityNotFoundException("Card with id " + idCard + " not found"));
    }
    
    public Card updateCardExpiration(Long idCard) {
        Card card = findCardById(idCard);
        card.setExpirationDate(card.getExpirationDate().plusYears(1));
        return cardRepository.save(card);
    }
}
