package com.lukeshay.restapi.gym;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GymService {

  private GymRepository gymRepository;

  @Autowired
  public GymService(GymRepository gymRepository) {
    this.gymRepository = gymRepository;
  }

  List<Gym> getAllGyms() {
    return gymRepository.findAll();
  }

  Gym getGymById(String gymId) {
    return gymRepository.findById(gymId).orElse(null);
  }

  Gym updateGym(
      String gymId,
      String name,
      String address,
      String city,
      String state,
      String email,
      String phoneNumber,
      String website) {
    Gym gym = gymRepository.findById(gymId).orElse(null);

    if (gym == null) {
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
}
