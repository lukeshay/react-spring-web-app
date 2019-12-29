package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/gyms")
@PreAuthorize("permitAll()")
public class PublicGymController {
  private static Logger LOG = LoggerFactory.getLogger(PublicGymController.class.getName());

  private GymService gymService;

  @Autowired
  public PublicGymController(GymService gymService) {
    this.gymService = gymService;
  }

  @GetMapping("")
  public ResponseEntity<?> getAllGyms() {
    LOG.debug("Getting all gyms");

    List<Gym> gyms = gymService.getAllGyms();

    return Responses.okJsonResponse(gyms);
  }

  @GetMapping("/{gymId}")
  public ResponseEntity<?> getGymById(@PathVariable String gymId) {
    LOG.debug("Getting gym {}", gymId);

    Gym foundGym = gymService.getGymById(gymId);

    if (foundGym == null) {
      return Responses.notFoundJsonResponse(Bodys.error("Gym not found."));
    } else {
      return Responses.okJsonResponse(foundGym);
    }
  }
}
