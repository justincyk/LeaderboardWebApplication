package com.capstone.pingpong.entity;

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
    private LocalDateTime created;
    @Column(name = "wins")
    private int wins;
    @Column(name = "loses")
    private int loses;
    //    Define relationships
    @OneToMany(mappedBy = "winner")
    private List<Matches> wonMatches;
    @OneToMany(mappedBy = "loser")
    private List<Matches> lostMatches;


    // define constructors
    public Players() {

    }

    public Players(String firstName, String lastName, String nickname) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
        this.wins = 0;
        this.loses = 0;
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

    public String getCreated() {
        return created.format(CUSTOM_FORMATTER);
    }

    // define toString
    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", nickname='" + nickname + '\'' +
                ", wins='" + wins + '\'' +
                ", loses='" + loses + '\'' +
                '}';
    }
}
