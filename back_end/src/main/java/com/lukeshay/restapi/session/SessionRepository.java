package com.lukeshay.restapi.session;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository extends JpaRepository<Session, String> {
  Optional<Session> findByUserId(String userId);
}
