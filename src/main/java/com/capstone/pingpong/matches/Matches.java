package com.capstone.pingpong.matches;

import com.capstone.pingpong.players.Players;
import jakarta.persistence.*;

import java.time.LocalDateTime;

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

    public Matches() {

    }

    public Matches(Players loser, Players winner) {
        this.loser = loser;
        this.winner = winner;
    }

    public Integer getId() {
        return id;
    }

    public Players getLoser() {
        return loser;
    }

    public Players getWinner() {
        return winner;
    }

    @Override
    public String toString() {
        return "Matches{" +
                "id=" + id +
                ", winner='" + winner.getNickname() + '\'' +
                ", loser='" + loser.getNickname() + '\'' +
                ", date='" + this.matchDate.toString() + '\'' +
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
