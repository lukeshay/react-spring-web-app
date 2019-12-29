package com.lukeshay.restapi.gym;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/gyms")
@PreAuthorize("isAuthenticated()")
@Api(value = "Gym api endpoints.")
public class GymController {

  private static Logger LOG = LoggerFactory.getLogger(GymController.class.getName());

  private GymService gymService;

  @Autowired
  public GymController(GymService gymService) {
    this.gymService = gymService;
  }

  @PutMapping("/{gymId}")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update a gym.", response = Gym.class)
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

  @PostMapping("")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Create a gym.", response = Gym.class)
  public ResponseEntity<?> createGym(@RequestBody Gym body) {
    Gym gym = gymService.createGym(body);

    return Responses.okJsonResponse(gym);
  }

  @GetMapping("")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Gets all gyms.", response = Gym.class)
  public ResponseEntity<?> getAllGyms() {
    LOG.debug("Getting all gyms");

    List<Gym> gyms = gymService.getAllGyms();

    return Responses.okJsonResponse(gyms);
  }

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Gets a gym.", response = Gym.class)
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
