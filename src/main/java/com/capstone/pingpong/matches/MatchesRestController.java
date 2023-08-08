package com.capstone.pingpong.matches;

import com.capstone.pingpong.players.EloRating;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class MatchesRestController {
    private MatchesService matchesService;
    private MatchesRepository matchesRepository;

    @Autowired
    public MatchesRestController(MatchesService matchesService, MatchesRepository matchesRepository) {
        this.matchesService = matchesService;
        this.matchesRepository = matchesRepository;
    }

    @PostMapping("/matches")
    public Matches saveMatch(@RequestBody Map<String, String> json) {

        Matches newMatch = matchesService.saveMatch(json.get("winner"), json.get("loser"));
        return newMatch;
    }
}
