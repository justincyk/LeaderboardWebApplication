package com.capstone.pingpong.matches;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class History {
    final static DateTimeFormatter CUSTOM_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    LocalDateTime matchDate;
    String winner;
    String loser;
    int matchId;

    public History(int matchId, String winner, String loser, LocalDateTime matchDate) {
        this.matchId = matchId;
        this.winner = winner;
        this.loser = loser;
        this.matchDate = matchDate;
    }

    public String getMatchDate() {
        return matchDate.format(CUSTOM_FORMATTER);
    }

    public void setMatchDate(LocalDateTime matchDate) {
        this.matchDate = matchDate;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }

    public String getLoser() {
        return loser;
    }

    public void setLoser(String loser) {
        this.loser = loser;
    }

    public int getMatchId() {
        return matchId;
    }

    public void setMatchId(int matchId) {
        this.matchId = matchId;
    }
}
