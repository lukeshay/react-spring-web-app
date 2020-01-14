package com.lukeshay.restapi.rating.route;

import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class RouteRatingService {

  private static Logger LOG = LoggerFactory.getLogger(RouteRatingService.class.getName());

  private RouteRatingRepository ratingRepository;
  private RouteRepository routeRepository;
  private Requests requests;

  @Autowired
  public RouteRatingService(
      RouteRatingRepository ratingRepository, RouteRepository routeRepository, Requests requests) {
    this.ratingRepository = ratingRepository;
    this.routeRepository = routeRepository;
    this.requests = requests;
  }

  public ResponseEntity<?> getRatingsByRouteId(String routeId) {
    LOG.debug("Getting ratings for route {}", routeId);
    List<RouteRating> ratings = ratingRepository.findAllByRouteId(routeId);
    return Responses.okJsonResponse(ratings);
  }

  public ResponseEntity<?> createRating(HttpServletRequest request, RouteRating rating) {
    LOG.debug("Creating rating {}", rating.toString());
    User user = requests.getUserFromRequest(request);

    if (user == null) {
      LOG.debug("User is unauthorized");
      return Responses.unauthorizedJsonResponse(null);
    }

    rating.setCreatorId(user.getId());
    rating.setCreatorUsername(user.getUsername());

    Route route = routeRepository.findById(rating.getRouteId()).orElse(null);

    if (!validateRating(rating) || route == null) {
      LOG.debug("Rating is invalid");
      return Responses.badRequestJsonResponse(Bodys.error("Rating is invalid."));
    }

    RouteRating newRating = ratingRepository.save(rating);

    route.addUserGrade(newRating.getGrade());
    route.addUserRating(newRating.getRating());

    route.updateAverages();

    route.setPersistable(true);

    return Responses.okJsonResponse(newRating);
  }

  private boolean validateRating(RouteRating rating) {
    return rating.getCreatorId() != null
        && rating.getCreatorUsername() != null
        && rating.getRouteId() != null
        && rating.getRating() != 0
        && rating.getRating() <= 5
        && rating.getGrade() != null;
  }
}
