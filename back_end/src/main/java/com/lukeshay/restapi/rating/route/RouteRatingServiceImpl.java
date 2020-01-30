package com.lukeshay.restapi.rating.route;

import com.lukeshay.restapi.route.Route;
import com.lukeshay.restapi.route.RouteRepository;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.utils.AuthenticationUtils;
import com.lukeshay.restapi.utils.BodyUtils;
import com.lukeshay.restapi.utils.ResponseUtils;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class RouteRatingServiceImpl implements RouteRatingService {

  private static Logger LOG = LoggerFactory.getLogger(RouteRatingServiceImpl.class.getName());

  @Autowired private RouteRatingRepository ratingRepository;
  @Autowired private RouteRepository routeRepository;

  @Override
  public ResponseEntity<?> createRating(Authentication authentication, RouteRating rating) {
    LOG.debug("Creating rating {}", rating.toString());
    User user = AuthenticationUtils.getUser(authentication);
    String routeId = rating.getRouteId();

    rating.setCreatorId(user.getId());
    rating.setCreatorUsername(user.getUsername());

    Route route = routeRepository.findById(routeId).orElse(null);

    if (!validateRating(rating) || route == null) {
      LOG.debug("Rating is invalid");
      return ResponseUtils.badRequest(BodyUtils.error("Rating is invalid."));
    }

    RouteRating newRating = ratingRepository.save(rating);

    List<RouteRating> ratings = ratingRepository.findAllByRouteId(routeId);

    route.updateAverages(ratings);

    routeRepository.save(route);

    return ResponseUtils.ok(newRating);
  }

  @Override
  public ResponseEntity<?> getRatingsByRouteId(String routeId) {
    LOG.debug("Getting ratings for route {}", routeId);
    List<RouteRating> ratings = ratingRepository.findAllByRouteId(routeId);
    return ResponseUtils.ok(ratings);
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
