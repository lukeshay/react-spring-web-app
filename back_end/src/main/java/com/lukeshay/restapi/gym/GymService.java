package com.lukeshay.restapi.gym;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

public interface GymService {
  Logger LOG = LoggerFactory.getLogger(GymService.class.getName());

  Gym createGym(Gym gym);

  Iterable<Gym> getAllGyms();

  Gym getGymById(String gymId);

  Gym updateGym(
      Authentication authentication,
      String gymId,
      String name,
      String address,
      String city,
      String state,
      String zipCode,
      String email,
      String phoneNumber,
      String website,
      List<String> authorizedEditors);

  ResponseEntity<?> uploadPhoto(
      Authentication authentication, MultipartFile file, String gymId, String imageName);
}
