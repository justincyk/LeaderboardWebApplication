package com.capstone.pingpong.dao;

import com.capstone.pingpong.entity.Players;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "players", path = "players")
public interface PlayerRepository extends JpaRepository<Players, String> {
}
