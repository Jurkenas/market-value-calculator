package solution.integrations.data;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeRateResponse {
    private boolean success;
    private boolean historical;
    private String base;
    private String date;
    private Map<String, BigDecimal> rates;
}
