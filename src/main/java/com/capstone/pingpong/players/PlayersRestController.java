package com.capstone.pingpong.players;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
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
    
}
