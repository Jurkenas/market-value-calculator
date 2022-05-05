package solution.integrations.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class ExchangeRateException extends Exception {

    public ExchangeRateException(String message) {
        super(message);
    }
}
