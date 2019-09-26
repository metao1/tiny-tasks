package com.coyoapp.tinytask.service;

import java.util.List;

/**
 * General service structure for all the endpoints
 * @param <T> The DTO class as model
 */
public interface GeneralService<T> {

  public T saveOrUpdateModel(T object);

  public T getModel(String id);

  public void removeModel(String id);

  List<T> getModels();

  public boolean isModelExist(T object);


}
