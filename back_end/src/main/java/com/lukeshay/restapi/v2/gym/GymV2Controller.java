package com.lukeshay.restapi.v2.gym;

import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
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

  @Autowired private GymV2Service gymV2Service;

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Get a gym by id with all walls and routes.", response = GymWithWalls.class)
  public ResponseEntity<?> getGym(HttpServletRequest request, @PathVariable String gymId) {
    LOG.debug("Getting all gym information of {}", gymId);

    GymWithWalls gym = gymV2Service.getGym(gymId);

    LOG.debug("The gym with walls: {}", gym);

    if (gym == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Error getting gym."));
    } else {
      return ResponseUtils.ok(gym);
    }
  }
}
