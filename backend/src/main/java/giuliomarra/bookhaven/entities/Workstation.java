package giuliomarra.bookhaven.entities;

import giuliomarra.bookhaven.enums.WorkstationStatus;
import giuliomarra.bookhaven.enums.WorkstationType;
import jakarta.persistence.*;

@Entity
@Table(name = "workstation")
public class Workstation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String positionCode;

    @Enumerated(EnumType.STRING)
    private WorkstationType type;

    @Enumerated(EnumType.STRING)
    private WorkstationStatus status;

    public Workstation() {
    }

    public Workstation(String positionCode, WorkstationType type, WorkstationStatus status) {
        this.positionCode = positionCode;
        this.type = type;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPositionCode() {
        return positionCode;
    }

    public void setPositionCode(String positionCode) {
        this.positionCode = positionCode;
    }

    public WorkstationType getType() {
        return type;
    }

    public void setType(WorkstationType type) {
        this.type = type;
    }

    public WorkstationStatus getStatus() {
        return status;
    }

    public void setStatus(WorkstationStatus status) {
        this.status = status;
    }
}
