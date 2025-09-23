package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {

    // Trova uno staff per codice identificativo
    Optional<Staff> findByIdentityCode(String identityCode);

    // Controlla se esiste già uno staff con un determinato codice identificativo
    boolean existsByIdentityCode(String identityCode);
}
