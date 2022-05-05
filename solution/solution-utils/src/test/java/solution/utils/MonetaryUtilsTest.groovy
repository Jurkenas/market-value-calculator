package solution.utils

import spock.lang.Specification

class MonetaryUtilsTest extends Specification {

    def "multiply two values"() {
        expect:
        MonetaryUtils.multiplyValue(firstValue, secondValue) == result

        where:
        firstValue       | secondValue          || result
        7 as BigDecimal  | 0 as BigDecimal      || 0 as BigDecimal
        7 as BigDecimal  | 0.212 as BigDecimal  || 1.48 as BigDecimal
        -7 as BigDecimal | 0.212 as BigDecimal  || -1.48 as BigDecimal
        -7 as BigDecimal | -0.212 as BigDecimal || 1.48 as BigDecimal
    }

    def "divide two values"() {
        expect:
        MonetaryUtils.divideValue(firstValue, secondValue) == result

        where:
        firstValue         | secondValue            || result
        700 as BigDecimal  | 0.00123 as BigDecimal  || 569105.69 as BigDecimal
        700 as BigDecimal  | 123123 as BigDecimal   || 0.01 as BigDecimal
        -700 as BigDecimal | 0.00123 as BigDecimal  || -569105.69 as BigDecimal
        -700 as BigDecimal | 123123 as BigDecimal   || -0.01 as BigDecimal
        -700 as BigDecimal | -0.00123 as BigDecimal || 569105.69 as BigDecimal
        -700 as BigDecimal | -123123 as BigDecimal  || 0.01 as BigDecimal
    }

    def "round value"() {
        expect:
        MonetaryUtils.roundValue(value) == result

        where:
        value                || result
        0 as BigDecimal      || 0 as BigDecimal
        0.043 as BigDecimal  || 0.04 as BigDecimal
        0.044 as BigDecimal  || 0.04 as BigDecimal
        0.045 as BigDecimal  || 0.05 as BigDecimal
        0.046 as BigDecimal  || 0.05 as BigDecimal
        -0.044 as BigDecimal || -0.04 as BigDecimal
        -0.045 as BigDecimal || -0.05 as BigDecimal
        -0.046 as BigDecimal || -0.05 as BigDecimal
    }
}
