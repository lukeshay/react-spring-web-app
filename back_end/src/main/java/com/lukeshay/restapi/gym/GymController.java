package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
      Authentication authentication, @PathVariable String gymId, @RequestBody Gym gym) {

    LOG.debug("Updating {}", gymId);

    gym =
        gymService.updateGym(
            authentication,
            gymId,
            gym.getName(),
            gym.getAddress(),
            gym.getCity(),
            gym.getState(),
            gym.getZipCode(),
            gym.getEmail(),
            gym.getPhoneNumber(),
            gym.getWebsite(),
            gym.getAuthorizedEditors());

    if (gym == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Gym not found"));
    } else {
      return ResponseUtils.ok(gym);
    }
  }

  @PostMapping("")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiOperation(value = "Create a gym.", response = Gym.class)
  public ResponseEntity<?> createGym(@RequestBody Gym body) {
    Gym gym = gymService.createGym(body);

    return ResponseUtils.ok(gym);
  }

  @Deprecated
  @GetMapping("/all")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Gets all gyms.", response = Gym.class)
  public ResponseEntity<?> getAllGyms() {
    LOG.debug("Getting all gyms");

    Iterable<Gym> gyms = gymService.getAllGyms();

    return ResponseUtils.ok(gyms);
  }

  @GetMapping("")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Gets gyms.", response = Gym.class)
  public ResponseEntity<Page<Gym>> getGyms(
      @PathParam("query") String query,
      @PathParam("sort") String sort,
      @PathParam("limit") Integer limit,
      @PathParam("page") Integer page) {
    LOG.debug("Getting gyms, query: {}, limit: {}, page: {}", query, limit, page);

    Page<Gym> gyms = gymService.getGyms(query, sort, limit, page);

    return ResponseUtils.okOfType(gyms);
  }

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Gets a gym.", response = Gym.class)
  public ResponseEntity<?> getGymById(@PathVariable String gymId) {
    LOG.debug("Getting gym {}", gymId);

    Gym foundGym = gymService.getGymById(gymId);

    if (foundGym == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Gym not found."));
    } else {
      return ResponseUtils.ok(foundGym);
    }
  }

  @PostMapping("/image/{imageName}")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Upload the gym's logo.", response = Gym.class)
  public ResponseEntity<?> uploadLogo(
      Authentication authentication,
      @RequestParam("file") MultipartFile file,
      @RequestParam("gymId") String gymId,
      @PathVariable String imageName) {
    LOG.debug("Uploading logo to gym {}", gymId);

    return gymService.uploadPhoto(authentication, file, gymId, imageName);
  }
}
