package solution.app.data;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class CarResultDTO {

    private Long key;
    private BigDecimal price;
    private String url;
    private String description;

}
