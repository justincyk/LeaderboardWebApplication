package com.capstone.pingpong.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Players {

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

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "created_at")
    private String created;

    @Column(name = "wins")
    private Integer wins;

    @Column(name = "loses")
    private Integer loses;

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

    public Integer getWins() {
        return wins;
    }

    public void setWins(Integer wins) {
        this.wins = wins;
    }

    public Integer getLoses() {
        return loses;
    }

    public void setLoses(Integer loses) {
        this.loses = loses;
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
