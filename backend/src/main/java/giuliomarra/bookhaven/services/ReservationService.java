package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Book;
import giuliomarra.bookhaven.entities.Card;
import giuliomarra.bookhaven.entities.Reservation;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.enums.BookStatus;
import giuliomarra.bookhaven.enums.ReservationStatus;
import giuliomarra.bookhaven.exceptions.BookNotAvailableException;
import giuliomarra.bookhaven.exceptions.CardExpiredException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.exceptions.RoleNotSupportedException;
import giuliomarra.bookhaven.payloads.BookReservationResponseDto;
import giuliomarra.bookhaven.payloads.CardReservationDto;
import giuliomarra.bookhaven.payloads.PendingReservationDto;
import giuliomarra.bookhaven.payloads.UserReservationDto;
import giuliomarra.bookhaven.repositories.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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

    // trova una prenotazione per id o lancia eccezione se non trovata
    public Reservation findById(Long id) {
        return reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found"));
    }

    // crea una nuova prenotazione per un libro da parte di un utente
    public BookReservationResponseDto reservationBook(Long idBook, User user) {
        Book book = bookService.findById(idBook);

        if (book.getStatus() != BookStatus.AVAILABLE) {
            throw new BookNotAvailableException("Book with id " + idBook + " is not available for reservation.");
        }

        if (user == null) {
            throw new RoleNotSupportedException("User not found or role not supported");
        }

        Card card = user.getCard();

        if (card.getExpirationDate().isBefore(LocalDate.now())) {
            throw new CardExpiredException("Card " + card.getCardNumber() + " expired");
        }

        Reservation reservation = new Reservation();
        reservation.setBook(book);
        reservation.setUser(user);
        reservation.setStatus(ReservationStatus.PENDING);
        reservation.setReservationDate(LocalDate.now());

        reservationRepository.save(reservation);

        bookService.updateBookStatus(idBook, BookStatus.BOOKED);

        return new BookReservationResponseDto(
                reservation.getId(),
                book.getTitle(),
                book.getIsbn(),
                ReservationStatus.PENDING,
                user.getTaxCode(),
                card.getCardNumber()
        );
    }

    // ottiene prenotazioni filtrate per stato e numero tessera, paginato
    public Page<PendingReservationDto> getReservations(ReservationStatus status, String cardNumber, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return reservationRepository.findReservationsByFilters(status, cardNumber, pageable);
    }

    // aggiorna lo stato di una prenotazione e applica regole su date e libri
    public void updateReservationStatus(Long reservationId, ReservationStatus newStatus) {
        Reservation reservation = findById(reservationId);

        reservation.setStatus(newStatus);
        reservation.setReservationDate(LocalDate.now());

        switch (newStatus) {
            case ACTIVE:
                reservation.setDueDate(LocalDate.now().plusDays(30));
                reservationRepository.save(reservation);
                break;
            case RETURNED:
                bookService.updateBookStatus(reservation.getBook().getId(), BookStatus.AVAILABLE);
                reservation.setReturnDate(LocalDate.now());
                reservationRepository.save(reservation);
                break;
            case DECLINED:
                bookService.updateBookStatus(reservation.getBook().getId(), BookStatus.AVAILABLE);
                reservationRepository.delete(reservation);
                break;
            default:
                reservationRepository.save(reservation);
                break;
        }
    }

    // ottiene prenotazioni per uno specifico utente, paginato
    public Page<UserReservationDto> getReservationsForUser(Long userId, Pageable pageable) {
        return reservationRepository.findReservationsByUserId(userId, pageable);
    }

    // ottiene prenotazioni filtrate per numero tessera, stato e se scadute, paginato
    public Page<CardReservationDto> getReservationsByCardStatusAndExpired(
            String cardNumber,
            ReservationStatus status,
            Boolean expired,
            Pageable pageable
    ) {
        if (cardNumber != null && cardNumber.isBlank()) cardNumber = null;
        return reservationRepository.findFilteredReservations(cardNumber, status, expired, pageable);
    }
}
