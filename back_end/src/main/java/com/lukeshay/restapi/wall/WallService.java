package com.lukeshay.restapi.wall;

import com.lukeshay.restapi.gym.Gym;
import com.lukeshay.restapi.gym.GymRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WallService {

  private WallRepository wallRepository;
  private GymRepository gymRepository;
  private Requests requests;

  @Autowired
  public WallService(WallRepository wallRepository, GymRepository gymRepository, Requests requests) {
    this.wallRepository = wallRepository;
    this.gymRepository = gymRepository;
    this.requests = requests;
  }

  public Wall createWall(HttpServletRequest request, Wall body) {
    User user = requests.getUserFromRequest(request);

    if (user == null) {
      return null;
    }

    Gym gym = gymRepository.findById(body.getGymId()).orElse(null);

    if (gym == null || !gym.getAuthorizedEditors().contains(user.getUserId())) {
      return null;
    }

    return wallRepository.save(body);
  }
}
