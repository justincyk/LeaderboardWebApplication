package com.capstone.pingpong.players;

import com.capstone.pingpong.matches.History;
import com.capstone.pingpong.matches.Matches;
import com.capstone.pingpong.matches.MatchesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.capstone.pingpong.players.User;

import java.lang.reflect.Array;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PlayersService {
    private final PlayersRepository playersRepository;
    private final MatchesRepository matchesRepository;

    @Autowired
    public PlayersService(PlayersRepository playersRepository, MatchesRepository matchesRepository) {
        this.playersRepository = playersRepository;
        this.matchesRepository = matchesRepository;
    }

    public Optional<Players> getPlayerByNickname(String nickname) {
        return playersRepository.findByNickname(nickname);
    }

    public List<User> getPlayers() {
        List<Players> playersList = (ArrayList<Players>) playersRepository.findAll();
        playersList.sort(Comparator.comparing(o -> o.getElo()));
        List<Matches> matchesList = (ArrayList<Matches>) matchesRepository.findAll();

        int rank = 1;
        int index = 0;
        float prevElo = 0;

        List<User> users = new ArrayList<>();
        for (Players player : playersList) {
            List<History> matchList = new ArrayList<>();
            for (Matches match : matchesList) {
                String winner = match.getWinner().getNickname();
                String loser = match.getLoser().getNickname();
                int gameId = match.getId();
                LocalDateTime matchDate = match.getMatchDate();

                if (match.getWinner() == player || match.getLoser() == player) {
                    History history = new History(gameId, winner, loser, matchDate);
                    matchList.add(history);
                }
            }
            float currElo = player.getElo();

            if (index != 0 && currElo != prevElo) {
                ++rank;
            }
            User user = new User(player, rank, matchList);
            prevElo = currElo;
            ++index;
            users.add(user);
        }
        return users;
    }

}
