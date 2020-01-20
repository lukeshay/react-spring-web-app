package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.services.AwsService;
import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class GymService {

  private static Logger LOG = LoggerFactory.getLogger(GymService.class.getName());

  private GymRepository gymRepository;
  private Requests requests;
  private AwsService awsService;

  @Autowired
  public GymService(GymRepository gymRepository, Requests requests, AwsService awsService) {
    this.gymRepository = gymRepository;
    this.requests = requests;
    this.awsService = awsService;
  }

  List<Gym> getAllGyms() {
    return gymRepository.findAll();
  }

  Gym getGymById(String gymId) {
    return gymRepository.findById(gymId).orElse(null);
  }

  Gym updateGym(
      HttpServletRequest request,
      String gymId,
      String name,
      String address,
      String city,
      String state,
      String zipCode,
      String email,
      String phoneNumber,
      String website,
      List<String> authorizedEditors) {

    Gym gym = gymRepository.findById(gymId).orElse(null);
    User user = requests.getUserFromRequest(request);

    if (gym == null
        || user == null
        || ((gym.getAuthorizedEditors() == null
                || !gym.getAuthorizedEditors().contains(user.getId()))
            && !user.getAuthorities().contains(UserTypes.ADMIN.authority()))) {
      return null;
    }

    if (name != null && !name.equals("")) {
      gym.setName(name);
    }

    if (address != null && !address.equals("")) {
      gym.setAddress(address);
    }

    if (city != null && !city.equals("")) {
      gym.setCity(city);
    }

    if (state != null && !state.equals("")) {
      gym.setState(state);
    }

    if (zipCode != null && !zipCode.equals("")) {
      gym.setZipCode(zipCode);
    }

    if (website != null && !website.equals("")) {
      gym.setWebsite(website);
    }

    if (phoneNumber != null && !phoneNumber.equals("")) {
      gym.setPhoneNumber(phoneNumber);
    }

    if (email != null && !email.equals("")) {
      gym.setEmail(email);
    }

    if (authorizedEditors != null && authorizedEditors.size() > 0) {
      gym.setAuthorizedEditors(authorizedEditors);
    }

    gym.setPersistable(true);

    return gymRepository.save(gym);
  }

  Gym createGym(Gym gym) {
    return gymRepository.save(gym);
  }

  ResponseEntity<?> uploadLogo(
      HttpServletRequest request, MultipartFile file, String gymId, String imageName) {
    Gym gym = gymRepository.findById(gymId).orElse(null);
    User user = requests.getUserFromRequest(request);

    if (gym == null
        || user == null
        || ((gym.getAuthorizedEditors() == null
                || !gym.getAuthorizedEditors().contains(user.getId()))
            && !user.getAuthorities().contains(UserTypes.ADMIN.authority()))) {
      return Responses.unauthorizedJsonResponse(
          Bodys.error("You are unauthorized to perform this action."));
    }

    if (!imageName.equals("logo") && !imageName.equals("gym")) {
      return Responses.badRequestJsonResponse(Bodys.error("Invalid upload."));
    }

    String url = awsService.uploadFileToS3(String.format("%s/logo.jpg", gym.getId()), file);
    if (url == null) {
      return Responses.internalServerErrorResponse(Bodys.error("Error uploading file."));
    } else {
      gym.setLogoUrl(url);
      gym = gymRepository.save(gym);
      return Responses.okJsonResponse(gym);
    }
  }
}
