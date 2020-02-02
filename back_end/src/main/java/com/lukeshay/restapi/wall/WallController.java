package com.lukeshay.restapi.wall;

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
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

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
  public ResponseEntity<?> createWall(Authentication authentication, @RequestBody Wall body) {
    LOG.debug("Adding wall {}", body);
    return wallService.createWall(authentication, body);
  }

  @PutMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update an existing wall.", response = Wall.class)
  public ResponseEntity<?> updateWall(Authentication authentication, @RequestBody Wall body) {
    LOG.debug("Updating wall {}", body);

    Wall wall =
        wallService.updateWall(
            authentication, body.getId(), body.getGymId(), body.getName(), body.getTypes());

    if (wall == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Error updating wall."));
    } else {
      return ResponseUtils.ok(wall);
    }
  }

  @DeleteMapping("/{wallId}")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Delete an existing wall.", response = Wall.class)
  public ResponseEntity<?> deleteWall(Authentication authentication, @PathVariable String wallId) {
    LOG.debug("Deleting wall {}", wallId);

    Wall wall = wallService.deleteWall(authentication, wallId);

    if (wall == null) {
      return ResponseUtils.badRequest(BodyUtils.error("Error deleting wall."));
    } else {
      return ResponseUtils.ok(wall);
    }
  }

  @GetMapping("/{gymId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Get a gyms walls.", response = Wall.class)
  public ResponseEntity<Page<Wall>> getWalls(
      Authentication authentication,
      @PathVariable String gymId,
      @PathParam("query") String query,
      @PathParam("sort") String sort,
      @PathParam("limit") Integer limit,
      @PathParam("page") Integer page) {
    LOG.debug("Getting gym {} walls", gymId);

    return wallService.getWalls(gymId, query, sort, limit, page);
  }

  @DeleteMapping("")
  @PreAuthorize("hasAuthority('ADMIN')")
  @ApiIgnore
  public ResponseEntity<?> deleteAll() {
    wallService.deleteAllWalls();
    return ResponseUtils.ok(null);
  }
}
