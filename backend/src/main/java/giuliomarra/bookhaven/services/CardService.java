package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewCardRequiredDto;
import giuliomarra.bookhaven.repositories.CardRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CardService {


    private final CardRepository cardRepository;

    public CardService(CardRepository cardRepository) {
        this.cardRepository = cardRepository;
    }

    // Crea una nuova card
    public Card addNewCard(NewCardRequiredDto body) {
        // Controlla se esiste già una card con lo stesso numero
        if (cardRepository.existsByCardNumber(body.cardNumber())) {
            throw new AlreadyexistsException("Card with this cardnumber " + body.cardNumber() + " already exists");
        }

        // Crea la nuova card con data di emissione odierna e scadenza tra un anno
        Card card = new Card(
                body.cardNumber(),
                LocalDate.now(),
                LocalDate.now().plusYears(1)
        );

        return cardRepository.save(card);
    }

    // trova una card per id o lancia eccezione se non trovata
    public Card findCardById(Long idCard) {
        return cardRepository.findById(idCard)
                .orElseThrow(() -> new EntityNotFoundException("Card with id " + idCard + " not found"));
    }

    // Aggiorna la scadenza di una card (aggiunge 1 anno)
    public Card updateCardExpiration(Long idCard) {
        Card card = findCardById(idCard);
        card.setExpirationDate(card.getExpirationDate().plusYears(1));
        return cardRepository.save(card);
    }
}

