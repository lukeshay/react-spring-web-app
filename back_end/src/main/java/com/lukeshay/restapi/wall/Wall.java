package com.lukeshay.restapi.wall;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Wall {
  @Id private String id;

  private String gymId;
  private String name;
  private List<Route> routes;
}
