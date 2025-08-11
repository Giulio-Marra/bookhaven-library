package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.entities.Reservation;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.enums.ReservationStatus;
import giuliomarra.bookhaven.exceptions.BookNotAvailableException;
import giuliomarra.bookhaven.exceptions.CardExpiredException;
import giuliomarra.bookhaven.payloads.BookReservationResponseDto;
import giuliomarra.bookhaven.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ReservationService {
    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    public BookReservationResponseDto ReservationBook(Long idBook, User user) {
        Book book = bookService.findById(idBook);

        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new BookNotAvailableException("Book with id " + idBook + " is not available for reservation.");
        }

        Card card = user.getCard();

        if (card.getExpirationDate().isBefore(LocalDate.now())) {
            throw new CardExpiredException("Card " + card.getCardNumber() + " expired");
        }

        Reservation reservation = new Reservation();
        reservation.setBook(book);
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.PENDING);

        reservationRepository.save(reservation);

        return new BookReservationResponseDto(
                reservation.getId(),
                book.getTitle(),
                book.getIsbn(),
                ReservationStatus.PENDING,
                user.getTaxCode(),
                card.getCardNumber()
        );

    }
}
