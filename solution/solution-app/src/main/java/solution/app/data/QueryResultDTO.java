package solution.app.data;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class QueryResultDTO {
    private List<CarResultDTO> carList;
    private BigDecimal averagePrice;
    private SearchParamsDTO searchParams;



}
