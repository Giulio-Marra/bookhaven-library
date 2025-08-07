package giuliomarra.bookhaven.controllers;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.payloads.NewMemberStaffAccountRequiredDto;
import giuliomarra.bookhaven.services.StaffService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/public")
public class TestController {
    @Autowired
    private StaffService staffService;

    @PostMapping("/create/staff")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Staff> registerTestStaff(@RequestBody @Valid NewMemberStaffAccountRequiredDto body) {
        Staff staff = staffService.createNewMemberStaff(body);
        return ResponseEntity.status(HttpStatus.CREATED).body(staff);
    }

}
