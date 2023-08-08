package com.capstone.pingpong.matches;

import com.capstone.pingpong.players.EloRating;
import com.capstone.pingpong.players.PlayersRepository;
import com.capstone.pingpong.players.Players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;

@Service
public class MatchesService {
    private final PlayersRepository playersRepository;
    private final MatchesRepository matchesRepository;

    @Autowired
    public MatchesService(PlayersRepository playersRepository, MatchesRepository matchesRepository) {
        this.playersRepository = playersRepository;
        this.matchesRepository = matchesRepository;
    }

    @Transactional
    public Matches saveMatch(Matches newMatch) {
        Matches dbMatches = matchesRepository.save(newMatch);
        Players winner = newMatch.getWinner();
        Players loser = newMatch.getLoser();
        HashMap<String, Float> updatedScores = new EloRating().updateEloRating(winner.getNickname(), loser.getNickname(), winner.getElo(), loser.getElo(), true);
        winner.setElo(updatedScores.get(winner.getNickname()));
        loser.setElo(updatedScores.get(loser.getNickname()));
        playersRepository.save(winner);
        playersRepository.save(loser);
        return dbMatches;
    }

    @Transactional
    public Matches saveMatch(String winnerNickname, String loserNickname) {
        Players winner = playersRepository.findByNickname(winnerNickname).orElseThrow(() -> new IllegalArgumentException("Winner with nickname '" + winnerNickname + "' not found"));
        Players loser = playersRepository.findByNickname(loserNickname).orElseThrow(() -> new IllegalArgumentException("Loser with nickname '" + loserNickname + "' not found"));
        HashMap<String, Float> updatedScores = new EloRating().updateEloRating(winner.getNickname(), loser.getNickname(), winner.getElo(), loser.getElo(), true);

        float newWinnerElo = updatedScores.get(winnerNickname);
        float winnerEloChange = newWinnerElo - winner.getElo();
        winner.setElo(newWinnerElo);
        winner.incrementWins();

        float newLoserElo = updatedScores.get(loserNickname);
        float loserEloChange = newLoserElo - loser.getElo();
        loser.setElo(newLoserElo);
        loser.incrementLoses();

        Matches newMatch = new Matches(winner, loser, winnerEloChange, loserEloChange);
        Matches dbMatches = matchesRepository.save(newMatch);

        playersRepository.save(winner);
        playersRepository.save(loser);
        return dbMatches;
    }


}
