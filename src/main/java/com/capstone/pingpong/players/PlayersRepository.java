package com.capstone.pingpong.players;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.Optional;


@RepositoryRestResource(collectionResourceRel = "players", path = "players")
public interface PlayersRepository extends JpaRepository<Players, String> {
    public Optional<Players> findByNickname(String nickname);
}
