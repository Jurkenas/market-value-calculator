package solution.integrations.services;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import solution.integrations.data.ExchangeRateRequest;
import solution.integrations.data.ExchangeRateResponse;
import solution.integrations.exception.ExchangeRateException;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;
import java.util.Map;

import static solution.utils.MonetaryUtils.divideValue;
import static solution.utils.MonetaryUtils.multiplyValue;

@Service
@RequiredArgsConstructor
public class ExchangeRateService {

    private final WebClient exchangeRateApi;
    private static final Duration REQUEST_TIMEOUT = Duration.ofSeconds(5);
    private static final String DEFAULT_DATE = "2021-01-01";

    public BigDecimal convertCurrency(BigDecimal amount, String currencyFrom, String currencyTo) throws ExchangeRateException {
        ExchangeRateResponse exchangeRate = getExchangeRates(new ExchangeRateRequest(DEFAULT_DATE));
        if (!currencyFrom.equals("EUR")) {
            amount = convertToEur(amount, currencyFrom, exchangeRate);
        }
        if (!currencyTo.equals("EUR")){
            return convertToSpecifiedCurrency(amount, currencyTo, exchangeRate);
        }
        return amount;
    }

    public List<String> getSupportedCurrencies() throws ExchangeRateException {
        return getExchangeRates(new ExchangeRateRequest(DEFAULT_DATE)).getRates().keySet().stream().toList();
    }

    private BigDecimal convertToEur(BigDecimal amount, String currencyFrom, ExchangeRateResponse exchangeRate) throws ExchangeRateException {
        return divideValue(amount, getCurrencyRate(exchangeRate.getRates(), currencyFrom));
    }

    private BigDecimal convertToSpecifiedCurrency(BigDecimal amount, String currencyTo,
                                                  ExchangeRateResponse exchangeRate) throws ExchangeRateException {
        return multiplyValue(amount, getCurrencyRate(exchangeRate.getRates(), currencyTo));
    }

    private ExchangeRateResponse getExchangeRates(ExchangeRateRequest request) throws ExchangeRateException {
        ExchangeRateResponse response = exchangeRateApi
                .get()
                .uri("/" + request.getDate())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(ExchangeRateResponse.class)
                .block(REQUEST_TIMEOUT);

        if (response == null) {
            throw new ExchangeRateException("Error in retrieving exchange rates");
        }

        return response;
    }

    private BigDecimal getCurrencyRate(Map<String, BigDecimal> rates, String currency) throws ExchangeRateException {
        BigDecimal rate = rates.get(currency);
        if (rate == null) {
            throw new ExchangeRateException("Unknown currency");
        }
        return rate;
    }


}
