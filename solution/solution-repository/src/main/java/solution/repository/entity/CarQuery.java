package solution.repository.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CarQuery {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long que_id;

    @Column(name = "source")
    private String source;
    @Column(name = "make")
    private String make;
    @Column(name = "model")
    private String model;
    @Column(name = "fuel")
    private String fuel;
    @Column(name = "makeDateFrom")
    private Long makeDateFrom;
    @Column(name = "makeDateTo")
    private Long makeDateTo;

}
