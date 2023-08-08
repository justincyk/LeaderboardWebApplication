package com.capstone.pingpong.players;

import com.capstone.pingpong.matches.Matches;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Entity
@Table(name = "players")
public class Players {

    //    @ManyToMany
//    @JoinTable(
//            name = "matchLoser",
//            joinColumns = @JoinColumn(name = "id"),
//            inverseJoinColumns = @JoinColumn(name = "loserId")
//    )
//    Set<Matches> loser;
//
//    @ManyToMany
//    @JoinTable(
//            name = "matchWinner",
//            joinColumns = @JoinColumn(name = "id"),
//            inverseJoinColumns = @JoinColumn(name = "winnerId")
//    )
//    Set<Matches> winner;

    //    Date Formatter
    static DateTimeFormatter CUSTOM_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    // define fields

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;
    @Column(name = "first_name")
    private String firstName;
    @Column(name = "last_name")
    private String lastName;
    @Column(name = "nickname")
    private String nickname;
    @Column(name = "created_at")
    private LocalDateTime created = LocalDateTime.now();
    @Column(name = "wins")
    private int wins;
    @Column(name = "loses")
    private int loses;
    @Column(name = "elo")
    private float elo;

    //    Define relationships
    @OneToMany(mappedBy = "winner")
    private List<Matches> wonMatches;
    @OneToMany(mappedBy = "loser")
    private List<Matches> lostMatches;


    // define constructors
    public Players() {

    }

    public Players(String firstName, String lastName, String nickname) {
        this.firstName = firstName.toLowerCase();
        this.lastName = lastName.toLowerCase();
        this.nickname = nickname.toLowerCase();
        this.wins = 0;
        this.loses = 0;
        this.created = LocalDateTime.now();
    }

    // define getter/setter
    public String getId() {
        return id;
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

    public LocalDateTime getCreated() {
        return created;
    }

    public void incrementWins() {
        this.wins++;
    }

    public void incrementLoses() {
        this.loses++;
    }

    public float getElo() {
        return elo;
    }

    public void setElo(float elo) {
        this.elo = elo;
    }

    // define toString
    @Override
    public String toString() {
        return "Players{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", created=" + created +
                ", wins=" + wins +
                ", loses=" + loses +
                ", elo=" + elo +
                ", wonMatches=" + wonMatches +
                ", lostMatches=" + lostMatches +
                '}';
    }
}
