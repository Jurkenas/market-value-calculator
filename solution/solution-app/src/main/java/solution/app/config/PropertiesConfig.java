package solution.app.config;

import org.springframework.beans.factory.config.PropertiesFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

@Configuration
public class PropertiesConfig {

    // #TODO implement different environments based on tomcat profile
    private static final String ENVIRONMENT = "test";

    // #TODO implement multiple config files
    private static final String PROP_FILE_NAME = "config.properties";

    @Bean
    public Properties config() throws FileNotFoundException {
        String resourcePath = String.format("/configs-%s/%s", ENVIRONMENT, PROP_FILE_NAME);
        PropertiesFactoryBean propertiesFactoryBean = new PropertiesFactoryBean();
        propertiesFactoryBean.setLocation(new ClassPathResource(resourcePath));
        try {
            propertiesFactoryBean.afterPropertiesSet();
            return propertiesFactoryBean.getObject();
        } catch (IOException e) {
            throw new FileNotFoundException();
        }
    }
}
