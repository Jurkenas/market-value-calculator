package solution.app.data;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommissionDTO {
    @NotBlank
    @Size(max = 3)
    private String currency;

    @NotNull
    @Positive
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal amount;
}
