package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewMemberStaffAccountRequiredDto;
import giuliomarra.bookhaven.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder bcrypt;

    public Staff findStaffById(Long id) {
        Optional<Staff> optionalStaff = staffRepository.findById(id);

        if (optionalStaff.isPresent()) {
            return optionalStaff.get();
        } else {
            throw new EntityNotFoundException("Staff with this id " + id + " not found");
        }
    }

    public Staff findStaffByIdentityCode(String identityCode) {
        return staffRepository.findByIdentityCode(identityCode)
                .orElseThrow(() -> new EntityNotFoundException("Staff with identity code " + identityCode + " not found"));
    }

    public Staff createNewMemberStaff(NewMemberStaffAccountRequiredDto body) {
        if (staffRepository.existsByIdentityCode(body.identityCode())) {
            throw new RuntimeException("Staff with this identity code alreeady exists");
        }
        Staff staff = new Staff(
                body.name(),
                body.surname(),
                body.identityCode(),
                body.email(),
                body.phoneNumber(),
                bcrypt.encode(body.password()),
                LocalDate.now(),
                null,
                true,
                Role.STAFF
        );

        return staffRepository.save(staff);
    }
}
