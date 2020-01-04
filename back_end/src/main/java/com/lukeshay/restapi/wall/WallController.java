package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wall")
@PreAuthorize("isAuthenticated()")
@Api(value = "Wall api endpoints.")
public class WallController {
  private static Logger LOG = LoggerFactory.getLogger(WallController.class.getName());

  private WallService wallService;

  @Autowired
  public WallController(WallService wallService) {
    this.wallService = wallService;
  }

  @PostMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Create a new wall", response = Wall.class)
  public ResponseEntity<?> createWall(HttpServletRequest request, @RequestBody Wall body) {
    LOG.debug("Adding wall {}", body);

    body.setRoutes(0);

    Wall wall = wallService.createWall(request, body);

    if (wall == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error adding wall."));
    } else {
      return Responses.okJsonResponse(wall);
    }
  }

  @PutMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update an existing wall.", response = Wall.class)
  public ResponseEntity<?> updateWall(HttpServletRequest request, @RequestBody Wall body) {
    LOG.debug("Updating wall {}", body.toString());

    Wall wall =
        wallService.updateWall(
            request, body.getId(), body.getGymId(), body.getName(), body.getType());

    if (wall == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error updating wall."));
    } else {
      return Responses.okJsonResponse(wall);
    }
  }

  @DeleteMapping("/{wallId}")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Delete an existing wall.", response = Wall.class)
  public ResponseEntity<?> deleteWall(HttpServletRequest request, @PathVariable String wallId) {
    LOG.debug("Deleting wall {}", wallId);

    Wall wall = wallService.deleteWall(request, wallId);

    if (wall == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error deleting wall."));
    } else {
      return Responses.okJsonResponse(wall);
    }
  }

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Get a gyms walls.", response = Wall.class)
  public ResponseEntity<List<Wall>> getWalls(
      HttpServletRequest request, @PathVariable String gymId) {
    LOG.debug("Getting gym {} walls", gymId);

    List<Wall> walls = wallService.getWalls(gymId);

    return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.APPLICATION_JSON).body(walls);
  }
}
