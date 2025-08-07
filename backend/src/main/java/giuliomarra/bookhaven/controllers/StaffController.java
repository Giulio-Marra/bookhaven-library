package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.payloads.NewMemberStaffAccountRequiredDto;
import giuliomarra.bookhaven.payloads.NewUserAccountRequiredDto;
import giuliomarra.bookhaven.payloads.RegisterUserInfoDto;
import giuliomarra.bookhaven.services.StaffService;
import giuliomarra.bookhaven.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    @Autowired
    private StaffService staffService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Staff> registerStaff(@RequestBody @Valid NewMemberStaffAccountRequiredDto body) {
        Staff staff = staffService.createNewMemberStaff(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(staff);
    }

    @PostMapping("/user/create")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<RegisterUserInfoDto> registerSUser(@RequestBody @Valid NewUserAccountRequiredDto body,
                                                             @AuthenticationPrincipal Staff staffLogged) {
        RegisterUserInfoDto userInfo = userService.createNewUserAccount(body, staffLogged);
        return ResponseEntity.status(HttpStatus.CREATED).body(userInfo);
    }


}
