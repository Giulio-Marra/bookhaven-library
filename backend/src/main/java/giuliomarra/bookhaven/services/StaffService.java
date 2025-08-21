package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.enums.Role;
import giuliomarra.bookhaven.exceptions.AlreadyexistsException;
import giuliomarra.bookhaven.exceptions.EntityNotFoundException;
import giuliomarra.bookhaven.payloads.NewMemberStaffAccountRequiredDto;
import giuliomarra.bookhaven.payloads.UpdateStaffInfoDto;
import giuliomarra.bookhaven.repositories.StaffRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class StaffService {

    private final StaffRepository staffRepository;
    private final PasswordEncoder bcrypt;

    public StaffService(StaffRepository staffRepository, PasswordEncoder bcrypt) {
        this.staffRepository = staffRepository;
        this.bcrypt = bcrypt;
    }

    public Staff findStaffById(Long id) {
        return staffRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Staff with id " + id + " not found"));
    }

    public Staff findStaffByIdentityCode(String identityCode) {
        return staffRepository.findByIdentityCode(identityCode)
                .orElseThrow(() -> new EntityNotFoundException("Staff with identity code " + identityCode + " not found"));
    }

    public Staff createNewMemberStaff(NewMemberStaffAccountRequiredDto body) {
        if (staffRepository.existsByIdentityCode(body.identityCode())) {
            throw new AlreadyexistsException("Staff with identity code " + body.identityCode() + " already exists");
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

    public Staff updateStaffInfo(Long id, UpdateStaffInfoDto dto) {
        Staff staff = findStaffById(id);

        staff.setName(dto.name());
        staff.setSurname(dto.surname());
        staff.setEmail(dto.email());
        staff.setPhoneNumber(dto.phoneNumber());
        staff.setIdentityCode(dto.identityCode());

        return staffRepository.save(staff);
    }


    public Staff changeStaffPassword(Long id, String newPassword) {
        Staff staff = findStaffById(id);
        staff.setPassword(bcrypt.encode(newPassword));
        return staffRepository.save(staff);
    }

    public void deleteStaff(Long id) {
        Staff staff = findStaffById(id);
        staffRepository.delete(staff);
    }

    public List<Staff> findAllStaff() {
        return staffRepository.findAll();
    }
}
