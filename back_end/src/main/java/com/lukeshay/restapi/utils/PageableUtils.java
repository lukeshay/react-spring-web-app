package com.lukeshay.restapi.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;

public class PageableUtils {
  public static PageRequest buildPageRequest(Integer page, Integer limit, String order) {
    int defaultPage = 0;
    int defaultLimit = 20;

    if (page != null && page > defaultPage) {
      defaultPage = page;
    }

    if (limit != null && limit > 0) {
      defaultLimit = limit;
    }

    Sort sort = Sort.unsorted();

    if (order != null) {
      String[] sorts = order.split(",");

      for (String s : sorts) {
        if (s.contains("asc")) {
          String param = s.replace("asc", "").replace(":", "");
          sort.and(Sort.by(Direction.ASC, param));
        } else if (s.contains("desc")) {
          String param = s.replace("desc", "").replace(":", "");
          sort.and(Sort.by(Direction.DESC, param));
        }
      }
    }

    return PageRequest.of(defaultPage, defaultLimit, sort);
  }
}
