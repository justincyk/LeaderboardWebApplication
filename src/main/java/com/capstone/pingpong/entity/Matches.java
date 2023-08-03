package com.capstone.pingpong.entity;

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

    public Players getLoser() {
        return loser;
    }

    public Players getWinner() {
        return winner;
    }

//    @PostPersist
//    public void updateWinnerWinsCount() {
//        if (winner != null) {
//            winner.incrementWins();
//        }
//    }
//
//    @PostPersist
//    public void updateLooserLosesCount() {
//        if (winner != null) {
//            winner.incrementWins();
//        }
//    }
}
