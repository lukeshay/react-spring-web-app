package com.lukeshay.restapi.wall;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/wall")
@PreAuthorize("isAuthenticated()")
public class WallController {
  private static Logger LOG = LoggerFactory.getLogger(WallController.class.getName());

  private WallRepository wallRepository;

  @Autowired
  public WallController(WallRepository wallRepository) {
    this.wallRepository = wallRepository;
  }
}
