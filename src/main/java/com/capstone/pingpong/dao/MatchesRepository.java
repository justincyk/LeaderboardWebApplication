package com.capstone.pingpong.dao;

import com.capstone.pingpong.entity.Matches;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "matches", path = "matches")
public interface MatchesRepository extends JpaRepository<Matches, Integer> {

}
