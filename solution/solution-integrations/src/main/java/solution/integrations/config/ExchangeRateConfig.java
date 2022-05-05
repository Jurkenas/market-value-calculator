package solution.integrations.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class ExchangeRateConfig {

    @Value("#{config['api.exchange.rate.url']}")
    private String currencyRatesApiUrl;

    @Value("#{config['api.exchange.rate.default.currency']}")
    private String defaultCurrency;

    public static String DEFAULT_API_CURRENCY_STATIC;

    @Value("#{config['api.exchange.rate.default.currency']}")
    public void setDefaultCurrencyStatic(String defaultCurrency){
        ExchangeRateConfig.DEFAULT_API_CURRENCY_STATIC = defaultCurrency;
    }

    @Bean
    public WebClient currencyRatesApiClient() {
        return WebClient.create(currencyRatesApiUrl);
    }


}
