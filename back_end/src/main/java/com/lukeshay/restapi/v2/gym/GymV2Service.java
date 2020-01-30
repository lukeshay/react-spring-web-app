package com.lukeshay.restapi.v2.gym;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public interface GymV2Service {
  Logger LOG = LoggerFactory.getLogger(GymV2Service.class.getName());

  GymWithWalls getGym(String gymId);
}
