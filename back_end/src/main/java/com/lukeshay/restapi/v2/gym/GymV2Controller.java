package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.utils.Body;
import com.lukeshay.restapi.utils.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import javax.servlet.http.HttpServletRequest;
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
@PreAuthorize("isAuthenticated()")
@RequestMapping("/v2/gyms")
@Api(value = "Gym v2 api endpoints.")
public class GymV2Controller {

  private static Logger LOG = LoggerFactory.getLogger(GymV2Controller.class.getName());

  private GymV2Service gymV2Service;

  @Autowired
  public GymV2Controller(GymV2Service gymV2Service) {
    this.gymV2Service = gymV2Service;
  }

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Get a gym by id with all walls and routes.", response = GymWithWalls.class)
  public ResponseEntity<?> getGym(HttpServletRequest request, @PathVariable String gymId) {
    LOG.debug("Getting all gym information of {}", gymId);

    GymWithWalls gym = gymV2Service.getGym(gymId);

    if (gym == null) {
      return Response.badRequest(Body.error("Error getting gym."));
    } else {
      return Response.ok(gym);
    }
  }
}
