package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Reservation;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.enums.ReservationStatus;
import giuliomarra.bookhaven.payloads.BookReservationResponseDto;
import giuliomarra.bookhaven.payloads.CardReservationDto;
import giuliomarra.bookhaven.payloads.UserReservationDto;
import giuliomarra.bookhaven.services.ReservationService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    // Prenota un libro per l'utente loggato
    @PostMapping("/{id}")
    public ResponseEntity<BookReservationResponseDto> reservationBook(
            @PathVariable Long id,
            @AuthenticationPrincipal User user
    ) {
        BookReservationResponseDto responseDto = reservationService.reservationBook(id, user);
        return ResponseEntity.ok(responseDto);
    }

    // Recupera tutte le prenotazioni di un utente
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<UserReservationDto>> getReservationsByUserId(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<UserReservationDto> reservations = reservationService.getReservationsForUser(
                userId, PageRequest.of(page, size)
        );
        return ResponseEntity.ok(reservations);
    }

    // Recupera le prenotazioni dell'utente loggato
    @GetMapping("/me")
    public ResponseEntity<Page<UserReservationDto>> getMyReservations(
            @AuthenticationPrincipal User user,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Page<UserReservationDto> reservations = reservationService.getReservationsForUser(
                user.getId(), PageRequest.of(page, size)
        );
        return ResponseEntity.ok(reservations);
    }

    // Recupera prenotazioni filtrate per card, status o scadenza
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/filter")
    public Page<CardReservationDto> getFilteredReservations(
            @RequestParam(required = false) String cardNumber,
            @RequestParam(required = false) ReservationStatus status,
            @RequestParam(required = false) Boolean expired,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return reservationService.getReservationsByCardStatusAndExpired(
                cardNumber,
                status,
                expired,
                PageRequest.of(page, size)
        );
    }

    // Aggiorna lo status di una prenotazione
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}/status")
    public ResponseEntity<Void> updateReservationStatus(
            @PathVariable Long id,
            @RequestParam ReservationStatus status
    ) {
        reservationService.updateReservationStatus(id, status);
        return ResponseEntity.noContent().build();
    }

    // Recupera prenotazione per ID
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<Reservation> getReservationById(@PathVariable Long id) {
        Reservation reservation = reservationService.findById(id);
        return ResponseEntity.ok(reservation);
    }
}
