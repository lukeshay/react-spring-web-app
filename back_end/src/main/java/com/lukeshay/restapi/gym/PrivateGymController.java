package com.lukeshay.restapi.gym;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gyms")
public class PrivateGymController {

  private static Logger LOG = LoggerFactory.getLogger(PrivateGymController.class.getName());

  private GymService gymService;

  @Autowired
  public PrivateGymController(GymService gymService) {
    this.gymService = gymService;
  }

  @PutMapping("/{gymId}")
  public ResponseEntity<?> updateGym(
      @PathVariable String gymId,
      @JsonProperty("state") String state,
      @JsonProperty("city") String city,
      @JsonProperty("address") String address,
      @JsonProperty("name") String name,
      @JsonProperty("email") String email,
      @JsonProperty("phoneNumber") String phoneNumber,
      @JsonProperty("website") String website) {
    LOG.debug("Updating {}", gymId);

    Gym gym = gymService.updateGym(gymId, name, address, city, state, email, phoneNumber, website);

    if (gym == null) {
      return Responses.notFoundJsonResponse(Bodys.error("Gym not found"));
    } else {
      return Responses.okJsonResponse(gym);
    }
  }
}
