package solution.utils;


import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.math.RoundingMode;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class MonetaryUtils {

    public static BigDecimal multiplyValue(BigDecimal firstValue, BigDecimal secondValue){
        return roundValue(firstValue.multiply(secondValue));
    }

    public static BigDecimal divideValue(BigDecimal dividend, BigDecimal divisor){
        return dividend.divide(divisor, 2, RoundingMode.HALF_UP);

    }
    public static BigDecimal roundValue(BigDecimal valueToRound){
        return valueToRound.setScale(2, RoundingMode.HALF_UP);
    }
}
