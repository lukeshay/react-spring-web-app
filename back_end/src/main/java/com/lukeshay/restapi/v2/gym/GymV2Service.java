package com.lukeshay.restapi.v2.gym;

import java.util.UUID;

public interface GymV2Service {

  GymWithWalls getGym(String gymId);
}
