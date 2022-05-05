package solution.app.data;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
public class ClientDiscountDTO {

    @NotNull
    @JsonProperty("clientId")
    private Long clientId;

    @NotNull
    @Positive
    @DecimalMin(value = "0.0", inclusive = false)
    @JsonProperty("discount")
    private BigDecimal discountedPrice;
}
