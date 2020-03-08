package com.coyoapp.tinytask.configuration;

import com.coyoapp.tinytask.dto.ObjectFactory;
import com.fasterxml.jackson.databind.ObjectMapper;
import ma.glasnost.orika.MapperFacade;
import ma.glasnost.orika.impl.ConfigurableMapper;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

  @Bean
  public ObjectMapper getObjectMapper() {
    return new ObjectMapper();
  }

  @Bean
  public MapperFacade mapperFacade() {
    return new ConfigurableMapper();
  }

  @Bean
  public ModelMapper getModelMapper() {
    return new ModelMapper();
  }

  @Bean
  public ObjectFactory dtoFactory() {
    return new ObjectFactory(getModelMapper(), getObjectMapper());
  }

}
