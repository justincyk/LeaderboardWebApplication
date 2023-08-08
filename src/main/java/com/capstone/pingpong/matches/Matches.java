package com.capstone.pingpong.matches;

import com.capstone.pingpong.players.Players;
import com.capstone.pingpong.players.PlayersRepository;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Optional;

@Entity
@Table(name = "matches")
public class Matches {
//    @ManyToMany(mappedBy = "matchWinner")
//    Set<Players> playerWinner;
//
//    @ManyToMany(mappedBy = "matchLoser")
//    Set<Players> playerLoser;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "loser_id", referencedColumnName = "id")
    private Players loser;

    @ManyToOne
    @JoinColumn(name = "winner_id", referencedColumnName = "id")
    private Players winner;

    @Column(name = "date")
    private LocalDateTime matchDate;

    @Column(name = "winner_elo_change")
    private float winnerEloChange;

    @Column(name = "loser_elo_change")
    private float loserEloChange;

    public Matches() {

    }

    public Matches(Players winner, Players loser, float winnerEloChange, float loserEloChange) {
        this.loser = loser;
        this.winner = winner;
        this.matchDate = LocalDateTime.now();
        this.winnerEloChange = winnerEloChange;
        this.loserEloChange = loserEloChange;
    }

//    public Matches(String winnerNickname, String loserNickname, PlayersRepository playersRepository) {
//        this.winner = playersRepository.findByNickname(winnerNickname).orElseThrow(() -> new IllegalArgumentException("Winner with nickname '" + winnerNickname + "' not found"));
//        this.loser = playersRepository.findByNickname(loserNickname).orElseThrow(() -> new IllegalArgumentException("Loser with nickname '" + loserNickname + "' not found"));
//    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Players getLoser() {
        return loser;
    }

    public Players getWinner() {
        return winner;
    }

    public float getWinnerEloChange() {
        return winnerEloChange;
    }

    public float getLoserEloChange() {
        return loserEloChange;
    }

    @Override
    public String toString() {
        return "Matches{" +
                "id=" + id +
                ", winner='" + winner.getNickname() + '\'' +
                ", loser='" + loser.getNickname() + '\'' +
                ", date='" + matchDate.toString() + '\'' +
                '}';
    }

    public LocalDateTime getMatchDate() {
        return matchDate;
    }

    //    @PostPersist
//    public void updateScoreCount() {
//        if (winner != null) {
//            winner.incrementWins();
//        }
//        if (loser != null) {
//            loser.incrementLoses();
//        }
//    }

}
