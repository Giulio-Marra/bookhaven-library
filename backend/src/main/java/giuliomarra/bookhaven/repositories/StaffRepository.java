package giuliomarra.bookhaven.repositories;

import giuliomarra.bookhaven.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<Staff, Long> {
    Optional<Staff> findByIdentityCode(String identityCode);

    boolean existsByIdentityCode(String identityCode);

}
