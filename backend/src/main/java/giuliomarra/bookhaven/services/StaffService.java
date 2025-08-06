package giuliomarra.bookhaven.services;

import giuliomarra.bookhaven.entities.Staff;
import giuliomarra.bookhaven.repositories.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    StaffRepository staffRepository;

    public Staff findStaffById(Long id) {
        Optional<Staff> optionalStaff = staffRepository.findById(id);

        if (optionalStaff.isPresent()) {
            return optionalStaff.get();
        } else {
            throw new RuntimeException("Staff with this id " + id + " not found");
        }
    }
}
