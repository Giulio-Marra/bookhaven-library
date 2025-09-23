package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.entities.User;
import giuliomarra.bookhaven.payloads.*;
import giuliomarra.bookhaven.services.StaffService;
import giuliomarra.bookhaven.services.UserService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
public class StaffController {

    private final StaffService staffService;
    private final UserService userService;

    public StaffController(StaffService staffService, UserService userService) {
        this.staffService = staffService;
        this.userService = userService;
    }

    // Registra nuovo membro dello staff
    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Staff> registerStaff(@RequestBody @Valid NewMemberStaffAccountRequiredDto body) {
        Staff staff = staffService.createNewMemberStaff(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(staff);
    }

    // Recupera tutti i membri dello staff
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(staffService.findAllStaff());
    }

    // Recupera membro dello staff per ID
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/{id}")
    public ResponseEntity<Staff> getStaffById(@PathVariable Long id) {
        return ResponseEntity.ok(staffService.findStaffById(id));
    }

    // Aggiorna informazioni di uno staff
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable Long id,
                                             @RequestBody @Valid UpdateStaffInfoDto dto) {
        return ResponseEntity.ok(staffService.updateStaffInfo(id, dto));
    }

    // Cambia password di uno staff
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/{id}/password/change")
    public ResponseEntity<String> changeStaffPassword(@PathVariable Long id,
                                                      @RequestBody String newPassword) {
        staffService.changeStaffPassword(id, newPassword);
        return ResponseEntity.ok("Password aggiornata con successo per lo staff con id " + id);
    }

    // Elimina membro dello staff
    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteStaff(@PathVariable Long id) {
        staffService.deleteStaff(id);
    }

    // Registra nuovo utente
    @PreAuthorize("hasAuthority('STAFF')")
    @PostMapping("/user/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RegisterUserInfoDto> registerUser(@RequestBody @Valid NewUserAccountRequiredDto body,
                                                            @AuthenticationPrincipal Staff staffLogged) {
        RegisterUserInfoDto userInfo = userService.createNewUserAccount(body, staffLogged);
        return ResponseEntity.status(HttpStatus.CREATED).body(userInfo);
    }

    // Cerca utenti per query
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/user/search")
    public Page<User> searchUsers(@RequestParam(required = false, defaultValue = "") String query,
                                  @RequestParam(defaultValue = "0") int page,
                                  @RequestParam(defaultValue = "10") int size) {
        return userService.searchUsers(query, page, size);
    }

    // Recupera tutti gli utenti
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.findAllUsers());
    }

    // Recupera utente per ID
    @PreAuthorize("hasAuthority('STAFF')")
    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.findUserById(id));
    }

    // Aggiorna informazioni utente
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/user/update/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserInfoDto dto) {
        User user = userService.findUserById(id);
        return ResponseEntity.ok(userService.updateUserInfo(user, dto));
    }

    // Reset della password utente
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/user/{id}/password/reset")
    public ResponseEntity<String> resetUserPassword(@PathVariable Long id) {
        String newPassword = userService.resetUserPassword(id);
        return ResponseEntity.ok(newPassword);
    }

    // Assegna nuova card a utente
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/user/{id}/card/assign")
    public ResponseEntity<User> assignNewCard(@PathVariable Long id, @RequestBody @Valid NewCardRequiredDto dto) {
        return ResponseEntity.ok(userService.assignNewCardToUser(id, dto));
    }

    // Rinnova card utente
    @PreAuthorize("hasAuthority('STAFF')")
    @PutMapping("/user/{id}/card/renew")
    public ResponseEntity<User> renewCard(@PathVariable Long id) {
        return ResponseEntity.ok(userService.renewUserCard(id));
    }

    // Elimina utente
    @PreAuthorize("hasAuthority('STAFF')")
    @DeleteMapping("/user/delete/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
