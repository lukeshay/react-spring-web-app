package com.lukeshay.restapi.gym;

import com.lukeshay.restapi.services.Requests;
import com.lukeshay.restapi.user.User;
import com.lukeshay.restapi.user.UserTypes;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GymService {

  private GymRepository gymRepository;
  private Requests requests;

  @Autowired
  public GymService(GymRepository gymRepository, Requests requests) {
    this.gymRepository = gymRepository;
    this.requests = requests;
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
      String email,
      String phoneNumber,
      String website) {

    Gym gym = gymRepository.findById(gymId).orElse(null);
    User user = requests.getUserFromRequest(request);
    
    if (gym == null
        || user == null
        || (!gym.getAuthorizedEditors().contains(user.getId())
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

    if (website != null && !website.equals("")) {
      gym.setWebsite(website);
    }

    if (phoneNumber != null && !phoneNumber.equals("")) {
      gym.setPhoneNumber(phoneNumber);
    }

    if (email != null && !email.equals("")) {
      gym.setEmail(email);
    }

    gym.setPersistable(true);

    return gymRepository.save(gym);
  }

  Gym createGym(Gym gym) {
    return gymRepository.save(gym);
  }
}
