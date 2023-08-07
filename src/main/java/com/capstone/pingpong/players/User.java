package com.capstone.pingpong.players;

import com.capstone.pingpong.matches.History;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class User {
    final static DateTimeFormatter CUSTOM_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private String id;
    private String firstName;
    private String lastName;
    private String nickname;
    private LocalDateTime created;
    private int wins;
    private int loses;
    private int rank;
    private List<History> history;


    public User(String id, String firstName, String lastName, String nickname, LocalDateTime date, int wins, int loses, int rank, List<History> history) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.created = date;
        this.wins = wins;
        this.loses = loses;
        this.rank = rank;
        this.history = history;
    }

    public User(Players player, int rank, List<History> history) {
        this.id = player.getId();
        this.firstName = player.getFirstName();
        this.lastName = player.getLastName();
        this.nickname = player.getNickname();
        this.created = player.getCreated();
        this.wins = player.getWins();
        this.loses = player.getLoses();
        this.rank = rank;
        this.history = history;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getCreated() {
        return created.format(CUSTOM_FORMATTER);
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getLoses() {
        return loses;
    }

    public void setLoses(int loses) {
        this.loses = loses;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public List<History> getHistory() {
        return history;
    }

    public void setHistory(List<History> history) {
        this.history = history;
    }
}
