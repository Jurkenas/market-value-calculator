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
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class CarResult {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long res_id;

    @Column(name = "res_que_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long resQueId;

    @Column(name = "price")
    private BigDecimal price;
    @Column(name = "url")
    private String url;
    @Column(name = "description")
    private String description;
}
