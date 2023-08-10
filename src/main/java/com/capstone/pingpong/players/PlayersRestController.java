package com.capstone.pingpong.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api")
public class PlayersRestController {

    private PlayersRepository playersRepository;
    private PlayersService playersService;

    @Autowired
    public PlayersRestController(PlayersRepository playersRepository, PlayersService playersService) {
        this.playersRepository = playersRepository;
        this.playersService = playersService;
    }

    @GetMapping("/players")
    public List<Players> retrieveAllStudents() {
        return playersRepository.findAll();
    }

    @GetMapping("/players/{id}")
    public Players retrievePlayer(@PathVariable String id) {
        Optional<Players> player = playersRepository.findById(id);

        if (player.isEmpty()) {
            throw new RuntimeException("Did not find player id - " + id);
        }
        return player.get();
    }

    @GetMapping("/players/nickname/{nickname}")
    public Players retrievePlayerByNickname(@PathVariable String nickname) {
        Optional<Players> player = playersRepository.findByNickname(nickname);

        if (player.isEmpty()) {
            throw new RuntimeException("Did not find player nickname - " + nickname);
        }
        return player.get();
    }

    @GetMapping("/players/users")
    public List<User> retrievePlayerByNickname() {
        return playersService.getPlayers();
    }

    @PostMapping("/players")
    public Players createPlayer(@RequestBody Players players) {
        players.setNickname(players.getNickname().toLowerCase());
        players.setFirstName(players.getFirstName().toLowerCase());
        players.setLastName(players.getLastName().toLowerCase());
        if (playersRepository.findByNickname(players.getNickname()).isPresent()) {
            throw new RuntimeException("Player with that nickname already exists - " + players.getNickname());
        }
        players.setElo(400);
        return playersRepository.save(players);
    }

}
